import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { IResponse } from "../../models/response/IResponse";
import { IPaginatedUsers } from "../../models/IUser";
import UserService from "../../service/userService";
import {
  FlatList,
  RefreshControl,
  View,
  ActivityIndicator,
} from "react-native";
import {
  LoadingScreen,
  UserPreview,
  Error,
  Input,
  Heading,
} from "../../components";
import { SearchUsersStyles } from "./styles";
import { AxiosError } from "axios";
import { conditionStyles } from "../../utils/conditionStyles";
import { Dimensions } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { API_URL } from "@env";

export const SearchUsers = () => {
  const isTabletOrMobileDevice = useMediaQuery({
    minDeviceWidth: 600,
  });
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [maxItems, setMaxItems] = useState<number>(0);
  const [{ isLoading, data, error }, setUserData] = useState<
    IResponse<IPaginatedUsers>
  >({
    isLoading: true,
    error: null,
    data: null,
  });
  const [currentLogin, setCurrentLogin] = useState<string>("");
  const isFocused = useIsFocused();
  const fetchUsers = async () => {
    if (
      data === null ||
      data.response.length !== maxItems ||
      currentPage === 0
    ) {
      if (currentPage === 0) {
        setUserData({
          isLoading: true,
          error: null,
          data: null,
        });
      }
      try {
        const responseData = await UserService.getUsers(
          currentPage.toString(),
          "15",
          currentLogin
        );
        setUserData({
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
      } catch (e: any | AxiosError) {
        setUserData({
          isLoading: false,
          error: e.response,
          data: null,
        });
      }
    }
  };

  const refresh = async () => {
    setCurrentPage(0);
    if (currentPage === 0) {
      fetchUsers();
    }
  };
  useEffect(() => {
    fetchUsers();
  }, [currentPage, isFocused]);

  const loadMoreItems = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const windowHeight = Dimensions.get("window").height;

  const { loader, wrapper, wrapperWide } = SearchUsersStyles;

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

  if (error) {
    return <Error />;
  }

  if (isLoading) {
    return <LoadingScreen />;
  }
  if (data) {
    return (
      <View
        style={{
          ...wrapper,
          ...conditionStyles(wrapperWide, isTabletOrMobileDevice),
          height: windowHeight - 52,
        }}
      >
        <Heading label="Search user" />

        <Input
          noError={true}
          labelText="Login search"
          defaultValue={currentLogin}
          onChangeText={(value: string) => setCurrentLogin(value)}
          onSubmitEditing={refresh}
        />

        <FlatList
          data={data.response}
          renderItem={({ item }) => <UserPreview {...item} />}
          keyExtractor={(item) => item.login}
          refreshControl={
            <RefreshControl refreshing={isLoading} onRefresh={refresh} />
          }
          ListFooterComponent={renderLoader}
          onEndReached={loadMoreItems}
          onEndReachedThreshold={0}
        />
      </View>
    );
  }

  return null;
};
