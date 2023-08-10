import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.backgroundColor};
  align-items: center;
`;

export const Title = styled.Text`
  font-size: ${(props) => props.theme.fontSize * 2}px;
  color: ${(props) => props.theme.textColor};
  margin-top: ${(props) => props.theme.margin * 2}px;
`;

export const Text = styled.Text`
  font-size: ${(props) => props.theme.fontSize}px;
  color: ${(props) => props.theme.textColor};
`;

export const Button = styled.TouchableOpacity`
  background-color: ${(props) => props.theme.primaryColor};
  padding: ${(props) => props.theme.margin}px;
  border-radius: ${(props) => props.theme.margin}px;
`;

export const ButtonText = styled.Text`
  font-size: ${(props) => props.theme.fontSize}px;
  color: ${(props) => props.theme.textColor};
`;

export const Image = styled.Image`
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
`;
