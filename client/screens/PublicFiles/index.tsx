import { useIsFocused, useNavigation } from "@react-navigation/native";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { IResponse } from "../../models/response/IResponse";
import { IFile } from "../../models/IFile";
import FileService from "../../service/fileService";
import { Error as ErrorType } from "../../models/IError";
import {
  LoadingScreen,
  Error,
  Heading,
  FileButton,
  Input,
  EmptyList,
} from "../../components";
import { AntDesign } from "@expo/vector-icons";
import { IPaginated } from "../../models/IPaginated";
import { PublicFilesStyles } from "./styles";
import {
  Dimensions,
  FlatList,
  RefreshControl,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Animated,
} from "react-native";
import { conditionStyles } from "../../utils/conditionStyles";
import { StackNavigation } from "../types";
import OutsidePressHandler from "react-native-outside-press";
import { Colors } from "../../styles/colors";

export const PublicFiles = observer(() => {
  const navigation = useNavigation<StackNavigation>();
  const isTabletOrMobileDevice = useMediaQuery({
    minDeviceWidth: 600,
  });

  const [isDropDownOpened, setIsDropDownOpened] = useState<boolean>(false);
  const [availableFilters, setAvailableFilters] = useState<string[]>([]);
  const [chosenFilters, setChosenFilters] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [maxItems, setMaxItems] = useState<number>(0);
  const isFocused = useIsFocused();
  const [height] = useState(new Animated.Value(0));
  const [currentName, setCurrentName] = useState<string>("");
  const [{ isLoading, data, error }, setFiles] = useState<
    IResponse<IPaginated<IFile> & { fileExtensions: string[] }>
  >({
    data: null,
    isLoading: true,
    error: null,
  });

  const loadFiles = async () => {
    if (
      data === null ||
      data.response.length !== maxItems ||
      currentPage === 0
    ) {
      if (currentPage === 0) {
        setFiles({
          data: null,
          isLoading: true,
          error: null,
        });
      }
      try {
        const responseData = await FileService.getPublicFiles(
          currentPage.toString(),
          "18",
          currentName,
          chosenFilters
        );
        setAvailableFilters(responseData.data.fileExtensions);
        setFiles({
          isLoading: false,
          error: null,
          data:
            data === null || currentPage === 0
              ? responseData.data
              : {
                  ...data,
                  response: [...data.response, ...responseData.data.response],
                },
        });
        setMaxItems(responseData.data.maxCount);
      } catch (error: ErrorType | any) {
        setFiles({
          isLoading: false,
          error,
          data: null,
        });
      }
    }
  };

  const refresh = async () => {
    setCurrentPage(0);
    if (currentPage === 0) {
      loadFiles();
    }
  };

  useEffect(() => {
    loadFiles();
  }, [isFocused, currentPage]);

  const loadMoreItems = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const {
    wrapper,
    wrapperWide,
    header,
    fileItem,
    linkText,
    loader,
    animatedFilter,
    animatedFilterList,
    text,
    textChosen,
    filterTitleText,
    filterSeparator,
    filterItem,
  } = PublicFilesStyles;

  const windowHeight = Dimensions.get("window").height;

  const renderLoader = () => {
    if (data === null || data.response.length !== maxItems) {
      return (
        <View style={loader}>
          <ActivityIndicator size="large" />
        </View>
      );
    }
    return null;
  };

  useEffect(() => {
    if (isDropDownOpened) {
      Animated.timing(height, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(height, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  }, [isDropDownOpened]);

  const maxHeight = height.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 200],
  });

  const setFilter = (filter: string) => {
    if (chosenFilters.includes(filter)) {
      setChosenFilters(
        chosenFilters.filter((filterItem) => filterItem !== filter)
      );
    } else {
      setChosenFilters([...chosenFilters, filter]);
    }
  };

  if (error) {
    return <Error />;
  }

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (data) {
    return (
      <>
        <View
          style={{
            ...wrapper,
            ...conditionStyles(wrapperWide, isTabletOrMobileDevice),
          }}
        >
          <View style={header}>
            <Heading label="Public files" />
            <TouchableOpacity
              onPress={() => {
                if (!isDropDownOpened) {
                  setIsDropDownOpened(true);
                }
              }}
            >
              <AntDesign name="filter" size={30} color={Colors.black} />
            </TouchableOpacity>
          </View>
          <Animated.View
            style={{
              maxHeight,
              ...animatedFilter,
            }}
          >
            <OutsidePressHandler
              onOutsidePress={() => setIsDropDownOpened(false)}
              disabled={!isDropDownOpened}
            >
              <View
                style={{
                  ...animatedFilterList,
                  ...conditionStyles(
                    { borderColor: Colors.transparent },
                    !isDropDownOpened
                  ),
                }}
              >
                <Text style={filterTitleText}>Shown files extensions</Text>
                <View style={filterSeparator} />
                <FlatList
                  data={availableFilters}
                  renderItem={({ item }) => {
                    return (
                      <TouchableOpacity
                        style={filterItem}
                        onPress={() => {
                          setFilter(item);
                          refresh();
                        }}
                      >
                        <Text
                          style={{
                            ...text,
                            ...conditionStyles(
                              textChosen,
                              chosenFilters.includes(item)
                            ),
                          }}
                        >
                          {item}
                        </Text>
                      </TouchableOpacity>
                    );
                  }}
                />
              </View>
            </OutsidePressHandler>
          </Animated.View>
          <Input
            noError={true}
            labelText="Search file by name"
            defaultValue={currentName}
            onChangeText={(value: string) => setCurrentName(value)}
            onSubmitEditing={refresh}
          />
          {data.response.length ? (
            <FlatList
              numColumns={3}
              style={{ height: windowHeight - 258 }}
              data={data.response}
              renderItem={({ item }) => (
                <View style={fileItem}>
                  <FileButton file={item} />
                </View>
              )}
              keyExtractor={(item) => item.name}
              ListFooterComponent={renderLoader}
              onEndReached={loadMoreItems}
              onEndReachedThreshold={0}
              refreshControl={
                <RefreshControl
                  refreshing={isLoading}
                  onRefresh={() => {
                    refresh();
                  }}
                />
              }
            />
          ) : (
            <View style={{ height: windowHeight - 258 }}>
              <EmptyList />
            </View>
          )}
          <TouchableOpacity
            onPress={() => navigation.navigate("PublicFolders")}
          >
            <Text style={linkText}>Public folders</Text>
          </TouchableOpacity>
        </View>
      </>
    );
  }

  return null;
});
