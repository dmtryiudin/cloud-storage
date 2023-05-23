import { createStackNavigator } from "@react-navigation/stack";
import { StackNavigationProp } from "@react-navigation/stack";

export type RootStackParamList = {
  PublicFiles: undefined;
  Profile: undefined;
  Auth: undefined;
  ProfileSettings: undefined;
  ClientSettings: undefined;
  SearchUsers: undefined;
  FilesAndFoldersForUser: undefined;
  FileSettings: undefined;
  Folder: undefined;
  FolderSettings: undefined;
  Trash: undefined;
  PublicFolders: undefined;
};

export type StackNavigation = StackNavigationProp<StackParamList>;
