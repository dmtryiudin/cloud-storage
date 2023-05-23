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
import { UserPreview } from "../../components";
import { SearchUsersStyles } from "./styles";
import { AxiosError } from "axios";
import { conditionStyles } from "../../utils/conditionStyles";

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

  const fetchUsers = async () => {
    if (data === null || data.response.length !== maxItems) {
      try {
        const responseData = await UserService.getUsers(
          currentPage.toString(),
          "15"
        );
        setUserData({
          isLoading: false,
          error: null,
          data:
            data === null
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
    if (data) {
      try {
        const responseData = await UserService.getUsers(
          "0",
          data.response.length.toString()
        );
        setUserData({
          isLoading: false,
          error: null,
          data: responseData.data,
        });
      } catch (e: any | AxiosError) {
        setUserData({
          isLoading: false,
          error: e.response,
          data: null,
        });
      }
    }
  };
  useEffect(() => {
    fetchUsers();
  }, [currentPage]);

  const loadMoreItems = () => {
    setCurrentPage((prev) => prev + 1);
  };

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
  console.log(error);
  console.log(data);
  if (data) {
    return (
      <View
        style={{
          ...wrapper,
          ...conditionStyles(wrapperWide, isTabletOrMobileDevice),
        }}
      >
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
};
