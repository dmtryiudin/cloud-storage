import { ActivityIndicator, Modal, Text, View } from "react-native";
import { LoadingStyles } from "./styles";

export const Loading: React.FC<{ show: boolean }> = ({ show }) => {
  const { loading, text, modal } = LoadingStyles;
  return (
    <>
      <Modal visible={show} transparent={true}>
        <View style={modal}>
          <View style={loading}>
            <ActivityIndicator size="large" />
            <Text style={text}>Loading...</Text>
          </View>
        </View>
      </Modal>
    </>
  );
};
