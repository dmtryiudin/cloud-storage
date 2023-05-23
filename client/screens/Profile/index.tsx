import {
  Image,
  View,
  Text,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import {
  BanButton,
  Button,
  Error,
  Heading,
  LoadingScreen,
} from "../../components";
import { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../context/store";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { observer } from "mobx-react-lite";
import { ProfileParamList } from "./types";
import { IUser } from "../../models/IUser";
import UserService from "../../service/userService";
import { IResponse } from "../../models/response/IResponse";
import {
  FontAwesome,
  MaterialIcons,
  FontAwesome5,
  Feather,
} from "@expo/vector-icons";
import { ProfileStyles } from "./styles";
import { useMediaQuery } from "react-responsive";
import { conditionStyles } from "../../utils/conditionStyles";
import { flag } from "country-emoji";
import { Error as ErrorType } from "../../models/IError";
import { StackNavigation } from "../types";
import { API_URL } from "@env";

export const Profile = observer(() => {
  const isTabletOrMobileDevice = useMediaQuery({
    minDeviceWidth: 600,
  });
  const [{ isLoading, data, error }, setUserData] = useState<IResponse<IUser>>({
    isLoading: true,
    error: null,
    data: null,
  });
  const { params } = useRoute<RouteProp<ProfileParamList>>();
  const navigation = useNavigation<StackNavigation>();
  const { store } = useContext(StoreContext);

  const {
    wrapper,
    userAvatar,
    nameWrapper,
    nameText,
    wrapperWide,
    textInfo,
    infoWrapper,
    scrollView,
    heading,
    buttonsWrapper,
    buttonWrapper,
    buttonsWrapperWide,
    buttonWrapperWide,
  } = ProfileStyles;
  const fetchUser = async () => {
    setUserData({
      isLoading: true,
      error: null,
      data: null,
    });
    try {
      const { data } = await UserService.getUser(params.login);

      setUserData({
        isLoading: false,
        error: null,
        data: data,
      });
    } catch (error: ErrorType | any) {
      setUserData({
        isLoading: false,
        error,
        data: null,
      });
    }
  };

  const logoutHandler = async () => {
    await store.logout();
    navigation.navigate("Auth");
  };
  useEffect(() => {
    fetchUser();
  }, [params.login]);

  if (error) {
    return <Error />;
  }

  if (isLoading) {
    return <LoadingScreen />;
  }

  const {
    login,
    email,
    name,
    country,
    avatar,
    registrationDate,
    filesCapacity,
    roles,
    isBanned,
    isActivated,
  } = data!;

  return (
    <ScrollView
      style={scrollView}
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={fetchUser} />
      }
    >
      <View
        style={{
          ...wrapper,
          ...conditionStyles(wrapperWide, isTabletOrMobileDevice),
        }}
      >
        <View style={heading}>
          <Heading label="User info" />
          <TouchableOpacity
            onPress={() => navigation.navigate("ProfileSettings")}
          >
            <Feather name="settings" size={30} color="black" />
          </TouchableOpacity>
        </View>

        {avatar ? (
          <Image
            style={userAvatar}
            source={{
              uri: `${API_URL}${avatar}`,
            }}
          />
        ) : (
          <FontAwesome name="user-circle-o" size={100} color="black" />
        )}
        <View style={nameWrapper}>
          <Text style={nameText}>{name || login}</Text>
          {isActivated && (
            <MaterialIcons name="verified" size={24} color="#10B981" />
          )}
          {roles.includes("MOD") && (
            <FontAwesome5 name="crown" size={24} color="#F7CE46" />
          )}
          {isBanned && <FontAwesome5 name="ban" size={24} color="#EF4444" />}
        </View>
        <View style={infoWrapper}>
          {email && <Text style={textInfo}>Email: {email}</Text>}
          {country && <Text style={textInfo}>Country: {flag(country)}</Text>}
          <Text style={textInfo}>
            Registration date:{" "}
            {new Date(registrationDate).toLocaleDateString("ru-RU")}
          </Text>
          <Text style={textInfo}>
            Files capacity: {filesCapacity * (9.537 * Math.pow(10, -7))} MB
          </Text>
        </View>
        <View
          style={{
            ...buttonsWrapper,
            ...conditionStyles(buttonsWrapperWide, isTabletOrMobileDevice),
          }}
        >
          <View
            style={{
              ...buttonWrapper,
              ...conditionStyles(buttonWrapperWide, isTabletOrMobileDevice),
            }}
          >
            {store.user.login === login && (
              <Button type="danger" onPress={logoutHandler} title="Logout" />
            )}
          </View>
          <View
            style={{
              ...buttonWrapper,
              ...conditionStyles(buttonWrapperWide, isTabletOrMobileDevice),
            }}
          >
            {store.user.roles?.includes("MOD") && !store.user?.isBanned && (
              <BanButton login={login} />
            )}
          </View>
        </View>
      </View>
    </ScrollView>
  );
});
