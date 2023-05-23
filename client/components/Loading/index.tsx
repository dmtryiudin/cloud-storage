import { ActivityIndicator, Text } from "react-native";
import Modal, { ModalContent } from "react-native-modals";
import { LoadingStyles } from "./styles";

export const Loading: React.FC<{ show: boolean }> = ({ show }) => {
  const { loading, text } = LoadingStyles;
  return (
    <>
      <Modal visible={show}>
        <ModalContent style={loading}>
          <ActivityIndicator size="large" />
          <Text style={text}>Loading...</Text>
        </ModalContent>
      </Modal>
    </>
  );
};
