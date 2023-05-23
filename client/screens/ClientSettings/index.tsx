import { useEffect, useState } from "react";
import { Switch, Text, View } from "react-native";
import { Heading } from "../../components";
import { useMediaQuery } from "react-responsive";
import { ClientSettingsStyles } from "./styles";
import { conditionStyles } from "../../utils/conditionStyles";
import { store } from "../../store/store";
import { observer } from "mobx-react-lite";

export const ClientSettings = observer(() => {
  const [tableFiles, setTableFiles] = useState<boolean>(false);

  console.log(store.settings);
  const isTabletOrMobileDevice = useMediaQuery({
    minDeviceWidth: 600,
  });
  useEffect(() => {
    setTableFiles(store.settings.tableFiles);
  }, []);

  useEffect(() => {
    store.updateSettings({
      tableFiles,
    });
  }, [tableFiles]);

  const { wrapper, wrapperWide, itemWrapper, text } = ClientSettingsStyles;
  return (
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
  );
});
