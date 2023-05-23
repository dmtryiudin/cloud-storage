import { createStackNavigator } from "@react-navigation/stack";
import { StackNavigationProp } from "@react-navigation/stack";

export type RootStackParamList = {
  Home: undefined;
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
};

export type StackNavigation = StackNavigationProp<StackParamList>;
