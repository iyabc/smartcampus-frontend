import { router } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, Alert } from 'react-native';
import { Button, ButtonText, YStack } from 'tamagui';

import MainButton from '../Buttons/MainButton';

import { useUser } from '~/contexts/UserContext';
import { TextInputBottomBorder, tokens } from '~/tamagui.config';
import { signIn, signUp } from '~/utils/auth';
import { deleteSecureValue, saveSecureValue } from '~/utils/secureStore';
import { UserType } from '~/utils/types';

type LoginRegisterFormProps = {
  displayType: UserType;
  onBackToHome: () => void;
};

const LoginRegisterForm: React.FC<LoginRegisterFormProps> = ({ displayType, onBackToHome }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const { changeUser } = useUser();

  const placeholderColor: string = tokens.color.white.val;

  const handleLogin = async () => {
    try {
      setLoading(true);
      const user = await signIn(email, password, displayType);
      if (user) {
        deleteSecureValue('accessToken');
        deleteSecureValue('userId');
        saveSecureValue('accessToken', user.accessToken);
        saveSecureValue('userId', user.data.userId);
        router.replace('/');
      }
    } catch (error: any) {
      Alert.alert('Error: ', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    try {
      setLoading(true);
      const user = await signUp(email, password, displayType);
      saveSecureValue('accessToken', user.accessToken);
      changeUser(user.data);
    } catch (error: any) {
      Alert.alert('Error: ', error.message);
    }
    setLoading(false);
  };

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <>
      <YStack marginBottom={14} gap={14}>
        <TextInputBottomBorder
          placeholder="Email"
          value={email}
          placeholderTextColor={placeholderColor}
          onChangeText={(currentValue: string) => setEmail(currentValue)}
          autoCapitalize="none"
        />
        <TextInputBottomBorder
          placeholder="Password"
          value={password}
          placeholderTextColor={placeholderColor}
          onChangeText={(currentValue: string) => setPassword(currentValue)}
          autoCapitalize="none"
          secureTextEntry
        />
      </YStack>
      <MainButton
        text="Login"
        textColor="$white"
        backgroundColor="$red"
        onPress={handleLogin}
        disabled={loading}
      />
      <MainButton
        text="Register"
        textColor="$white"
        backgroundColor="$grey"
        onPress={handleRegister}
        disabled={loading}
      />
      <Button
        onPress={onBackToHome}
        backgroundColor="transparent"
        alignSelf="flex-end"
        padding={0}
        disabled={loading}
        pressStyle={{ backgroundColor: 'transparent', borderWidth: 0 }}>
        <ButtonText textTransform="capitalize">Not a {displayType}?</ButtonText>
      </Button>
    </>
  );
};

export default LoginRegisterForm;
