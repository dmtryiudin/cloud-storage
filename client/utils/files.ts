import * as DocumentPicker from "expo-document-picker";

export const convertFileToBlob = async (uri: string) => {
  const fetchResponse = await fetch(uri);
  const blob = await fetchResponse.blob();
  return blob;
};
