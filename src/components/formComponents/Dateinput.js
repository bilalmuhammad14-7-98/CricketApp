
import { View, Text , Button} from 'react-native'
import React, {useState} from 'react'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import CustomFormInput from "../../components/formComponents/CustomFormInput";

const Dateinput = () => {

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const showDatePicker = () => {
      setDatePickerVisibility(true);
    };
  
    const hideDatePicker = () => {
      setDatePickerVisibility(false);
    };
  
    const handleConfirm = (date) => {
      console.warn("A date has been picked: ", date);
      hideDatePicker();
    };

  return (
    <View>
    <CustomFormInput
              // autoComplete="name"
              // onChangeText={onChangeText}
              // value={text}
              placeholderText="Date of Birth"
              onPress ={showDatePicker}
        />
      <Button title="Show Date Picker" onPress={showDatePicker} />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        
      />
    </View>
  )
}

export default Dateinput;