import { useContext, useEffect, useState } from "react";
import { Modal, Pressable, Switch, Text, View } from "react-native";
import { Button, Heading } from "../../components";
import { useMediaQuery } from "react-responsive";
import { ClientSettingsStyles } from "./styles";
import { conditionStyles } from "../../utils/conditionStyles";
import { observer } from "mobx-react-lite";
import { StoreContext } from "../../context/store";

export const ClientSettings = observer(() => {
  const [tableFiles, setTableFiles] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const { store } = useContext(StoreContext);
  const isTabletOrMobileDevice = useMediaQuery({
    minDeviceWidth: 600,
  });
  useEffect(() => {
    setTableFiles(store.settings.tableFiles);
  }, []);

  useEffect(() => {
    if (store.settings.tableFiles !== tableFiles) {
      store.updateSettings({
        tableFiles,
      });
    }
  }, [tableFiles]);

  useEffect(() => {
    if (store.error) {
      setIsError(true);
    }
  }, [store.error]);

  const {
    wrapper,
    wrapperWide,
    itemWrapper,
    text,
    modal,
    modalContentWrapper,
    modalTextWrapper,
    modalText,
  } = ClientSettingsStyles;
  return (
    <>
      <View
        style={{
          ...wrapper,
          ...conditionStyles(wrapperWide, isTabletOrMobileDevice),
        }}
      >
        <Heading label="Client settings" />
        <View style={itemWrapper}>
          <Text style={text}>Table files and folders display</Text>
          <Switch
            onValueChange={() => setTableFiles((prev) => !prev)}
            value={tableFiles}
          />
        </View>
      </View>
      <Modal
        visible={isError}
        transparent={true}
        animationType="slide"
        onRequestClose={() => {
          setIsError(false);
        }}
      >
        <Pressable
          style={modal}
          onPress={(event) =>
            event.target == event.currentTarget && setIsError(false)
          }
        >
          <View style={modalContentWrapper}>
            <View style={modalTextWrapper}>
              <Text style={modalText}>Something went wrong</Text>
              <Button title="OK" onPress={() => setIsError(false)} />
            </View>
          </View>
        </Pressable>
      </Modal>
    </>
  );
});
