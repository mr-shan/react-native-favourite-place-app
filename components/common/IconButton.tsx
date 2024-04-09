import { Pressable, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import COLORS from '../../styles/colors';

interface IProps {
  name: keyof typeof Ionicons.glyphMap;
  size?: number;
  color?: string;
  style?: ViewStyle
  onPress: () => void;
}

const IconButton = (props: IProps) => {
  const size = props.size || 24;
  const color = props.color || COLORS.dark500;

  return (
    <Pressable onPress={props.onPress} style={props.style}>
      <Ionicons name={props.name} size={size} color={color} />
    </Pressable>
  );
};

export default IconButton;
