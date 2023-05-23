import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import React, { useContext } from "react";
import { Auth } from "./Auth";
import { Header } from "./Header";
import { PublicFiles } from "./PublicFiles";
import { Profile } from "./Profile";
import { RootStackParamList } from "./types";
import { ProfileSettings } from "./ProfileSettings";
import { ClientSettings } from "./ClientSettings";
import { Loading } from "../components";
import { StoreContext } from "../context/store";
import { observer } from "mobx-react-lite";
import { SearchUsers } from "./SearchUsers";
import { FilesAndFoldersForUser } from "./FilesAndFoldersForUser";
import { FileSettings } from "./FileSettings";
import { Folder } from "./Folder";
import { FolderSettings } from "./FolderSettings";
import { Trash } from "./Trash";
import { PublicFolders } from "./PublicFolders";

const Stack = createNativeStackNavigator<RootStackParamList>();
export const Navigation = observer(() => {
  const options = {
    headerTitle: () => null,
    header: () => <Header />,
  };

  const { store } = useContext(StoreContext);
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="PublicFiles"
            component={PublicFiles}
            options={options}
          />
          <Stack.Screen
            name="PublicFolders"
            component={PublicFolders}
            options={options}
          />
          <Stack.Screen name="Auth" component={Auth} options={options} />
          <Stack.Screen name="Profile" component={Profile} options={options} />
          <Stack.Screen
            name="ProfileSettings"
            component={store.isAuth ? ProfileSettings : Auth}
            options={options}
          />
          <Stack.Screen
            name="ClientSettings"
            component={store.isAuth ? ClientSettings : Auth}
            options={options}
          />
          <Stack.Screen
            name="SearchUsers"
            component={SearchUsers}
            options={options}
          />
          <Stack.Screen
            name="FilesAndFoldersForUser"
            component={store.isAuth ? FilesAndFoldersForUser : Auth}
            options={options}
          />
          <Stack.Screen
            name="FileSettings"
            component={FileSettings}
            options={options}
          />
          <Stack.Screen
            name="FolderSettings"
            component={FolderSettings}
            options={options}
          />
          <Stack.Screen name="Folder" component={Folder} options={options} />
          <Stack.Screen
            name="Trash"
            component={store.isAuth ? Trash : Auth}
            options={options}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <Loading show={store.isLoading} />
    </>
  );
});
