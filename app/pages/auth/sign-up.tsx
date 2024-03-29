import React, { useEffect, useState } from "react";
import {
  TextInput,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Pressable,
} from "react-native";
import { SignUpService } from "@services/auth";
// import { selectUser } from "@/redux/selectors/auth";
import { Text, View, useThemeColor } from "@common/Themed";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { loginSuccess } from "@redux/slice/authSlice";
import { scaleFont } from "../../utils/scaleFont";
import { BaseProps } from "../../types/BaseProps";
import { Picker } from "@react-native-picker/picker";
import { useSelector } from "react-redux";
import { selectUser } from "@redux/selectors/auth";
import { useNavigation } from "@react-navigation/native";
// import { loginSuccess } from "@/redux/slice/authSlice";

const SignUpScreen = () => {
  const [email, setEmail] = useState("mgiwa78@gmail.com");
  const [password, setPassword] = useState("Password");
  const [fullName, setFullName] = useState("");
  const [preference, setPreference] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("Password");
  const [serverErr, setServerErr] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [passwordShow, setPasswordShow] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const user = useSelector(selectUser);

  const handleLogin = async () => {
    setIsLoading(true);
    setServerErr("");

    try {
      const RESPONSE = await SignUpService({
        password,
        email,
        fullName,
        preference,
      });
      console.log(RESPONSE);
      dispatch(loginSuccess(RESPONSE));
      navigation?.navigate("Sounds");
    } catch (error: any) {
      console.log(error?.response?.data);
      if (error?.response?.data?.message)
        setServerErr(error?.response?.data?.message);
      else setServerErr(error?.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        {/* <Image
            style={styles.image}
            source={{
              uri: "data:image/png;base64,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",
            }}
          /> */}

        <View style={styles.header}>
          <Text style={styles.headerText}>Create a new account</Text>
        </View>

        <View style={styles.inputBox}>
          <Text style={styles.label}>Full Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Full Name"
            onChangeText={(text) => setFullName(text)}
            value={fullName}
          />
          {fullName && (
            <Image
              style={[styles.inputImage, { width: 20.67, height: 15.9 }]}
              source={{
                uri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADYAAAAoCAYAAAC1mQk2AAAACXBIWXMAACxLAAAsSwGlPZapAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAHBSURBVHgB1dlBTsJAFMbxNw0LlxwBlyYuZGF0KTfQG9ATGE5gPQFH6BW8AS5NXMjCRJcegSULsL6vQROEwsx0Ou/NPyGlQNL+0mQ6Uwwl3M1b2V+e0LQydIt9U9ETbx5fzvKvHiXa9Uc5WBLN+O2AQb+Nsc+vkaEEA4o2qH3fr9c0zCixjqGQyfgqUkLZoDadJnPFHFD14JHEFXNEFXijHuaDQqphviikFtYGhVTC2qKQOlgIFFIFC4VCamAhUUgFLDQKicO6QCFRWFcoJAbrEoVEYF2jUHRYDBSqYVef5T1vCl5i942heVXRHab+FLhYKGT4YA+8LbY+NLRYrWj0ep7PKVAxUQgLzfH/D/mK9Xs9ml2+lxcUoNgolDUdLBROAoUAe276si1OCoUyflQ14QeOi6Yf+OIkUageFXHSGZ88RsXGHzoMKNIo9HcfC4XTgEJbN+i2OC0otDPz8MVpQqG9UypXnDYUapwr2uLom3IeVaekCIUOToJtcJZFRaGjs/sAuOgoZLVsaYETQSHr9ZgHTgyFnBaaDjhRFHJeQVvgxFHI69HAAZwKFPL6RxM3ZUYN+f5VzzywOuD9iRYU+gEFuzApiTpDSwAAAABJRU5ErkJggg==",
              }}
            />
          )}
        </View>
        <View style={styles.inputBox}>
          <Text style={styles.label}>Preference</Text>
          <Picker
            style={{ backgroundColor: "#f6f6f7", borderRadius: 20 }}
            itemStyle={{
              color: useThemeColor({ light: "#000", dark: "#fff" }, "tint"),
            }}
            selectedValue={preference}
            onValueChange={(itemValue) => setPreference(itemValue)}
          >
            <Picker.Item label="Select your preference" value="" />
            <Picker.Item label="Anything" value="Anything" />
            <Picker.Item label="Engine" value="Engine" />
            <Picker.Item label="Water" value="Water" />
            <Picker.Item label="Lo-Fi" value="Lo-Fi" />
          </Picker>
        </View>
        <View style={styles.inputBox}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            keyboardType="email-address"
            placeholder="Enter Email"
            onChangeText={(text) => setEmail(text)}
            value={email}
          />
          {email && (
            <Image
              style={[styles.inputImage, { width: 20.67, height: 15.9 }]}
              source={{
                uri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADYAAAAoCAYAAAC1mQk2AAAACXBIWXMAACxLAAAsSwGlPZapAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAHBSURBVHgB1dlBTsJAFMbxNw0LlxwBlyYuZGF0KTfQG9ATGE5gPQFH6BW8AS5NXMjCRJcegSULsL6vQROEwsx0Ou/NPyGlQNL+0mQ6Uwwl3M1b2V+e0LQydIt9U9ETbx5fzvKvHiXa9Uc5WBLN+O2AQb+Nsc+vkaEEA4o2qH3fr9c0zCixjqGQyfgqUkLZoDadJnPFHFD14JHEFXNEFXijHuaDQqphviikFtYGhVTC2qKQOlgIFFIFC4VCamAhUUgFLDQKicO6QCFRWFcoJAbrEoVEYF2jUHRYDBSqYVef5T1vCl5i942heVXRHab+FLhYKGT4YA+8LbY+NLRYrWj0ep7PKVAxUQgLzfH/D/mK9Xs9ml2+lxcUoNgolDUdLBROAoUAe276si1OCoUyflQ14QeOi6Yf+OIkUageFXHSGZ88RsXGHzoMKNIo9HcfC4XTgEJbN+i2OC0otDPz8MVpQqG9UypXnDYUapwr2uLom3IeVaekCIUOToJtcJZFRaGjs/sAuOgoZLVsaYETQSHr9ZgHTgyFnBaaDjhRFHJeQVvgxFHI69HAAZwKFPL6RxM3ZUYN+f5VzzywOuD9iRYU+gEFuzApiTpDSwAAAABJRU5ErkJggg==",
              }}
            />
          )}
          <Image
            style={styles.inputImage}
            source={{
              uri: "data:image/jpeg;base64,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",
            }}
          />
        </View>
        <View style={styles.inputBox}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter secure Password"
            secureTextEntry={true}
            onChangeText={(text) => setPassword(text)}
            value={password}
          />

          {!passwordShow && (
            <Pressable
              style={styles.inputImage}
              onPress={() => setPasswordShow(!passwordShow)}
            >
              <Image
                style={styles.inputEye}
                source={{
                  uri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEMAAAAvCAYAAAC4/HdSAAAACXBIWXMAACxLAAAsSwGlPZapAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAATqSURBVHgB1Vpdcts2EP4AOn2teoIoJ4h9gioniH2AVuIBapuTaV8tPbe1rLjvknqBKCeofIL6COwN9NqMCGQXlGw5EiRCWDHON0MPDZAC+GF3sT9QqAm/94ctneBY6+Q1LJqwtknNjcW1xAwKOaBm9Mx9URR3Bsh/y9J71ACFA6HfHzboQ071UdKmDz/G048ORU5Tnc6LYvxrlk5xIIiTwRJwlCRvAdtBHAE+5AampwtMsyzNIQgxMhwJR8kVSUELtUGNUBQ9KVKiyWB1QJL0F5LwNcCSMnh3nt4gElFkXN+OL5RFF4dRh1DkKMybGCnZiwwnDUfJh3pVoiKU7ma//NTDHggmg4g4RqI/0G0TzxZqQrYkC5WSIDKu/xq3lQHr5nNQi10IVhtd9cH+7fiKiBjh2yCC0SQJ/sdJckVUIoOJQGkoJTCzFgNatTO6XmXnbcUX3f9A1wlgUig7gQyCCNmpJoJEsNimWUUPkj6gSUvVIYN4hXjMFiqz1a3fSoYYESwJxnRpMjMEoiSFDLZCZXH3YCchXjLkJIKk4TwdIRLXg/FIKbQRBybkxGdUN5Lxx+3wNLFu+4yEyTIBz3AJIUK8u8yaAWWxJCKGiIVFT5IIhjLmEi6CjUKpdpt+f/Ufp59kfRHvUOW0Q7za9RB7sgXQ4ntLIlwlPKd3Wos5RkLdZOc/Z09angz0/u+hTMC13U440o+S4QZ3PqfdY4T5fLDN2NI8iYz4UEBbdC4u2uOH/5c3HHQJRZ75NiLYHtHK/uuJaygDZrrc7wjzgcJ2CMAo3KyO48jgBiXmVNmpr2fFHu3yYkldE6/dWvgqwdv0BjRWxyklI0muIOVmK/vR2xc0jm39+X7Y8fZa8xEicOOwYYYuBxRMzMw3W3sX9geOo5F4t1GrIJYk1tBXPD/NNxCEz8ObYx8P0m57R0JNlmgYrS9ZTZqoAVQmaCIctUXIWtmXmlPwEESpDhsGK/YS6xy1wd5p2qZSCOLFi+++93TlCBZt/87kClFycO6AZh/dWCOybzP+N5/ebGpnJ4rGGSAEhfXOiypzP0IKFKu43+Q/7y7SLpfzIADaAd56+8qUYY4q4NhmW8pOKhm9Ms5joGYMq4uAhbYtn91wLjavwi7ieYIX7a6ve5v/EYh8dZwHMsotUURd3Dbl6+RVoAks03tTPC5ATsHCyIXXW4goJy2X/VptWMtn1JFEicGicCWQGlgPJtfyGUI5g4YvZxADsRiqzLWMvmxeI+NBr2MJoZxlmRKQwUquJdIRsxOfGm4sFTjx5lR+tEG1HSbEZ1CrQizpxPFMYVN/9/ZJHMusxv5FYcHidr6wY94F3l03kSOEhxtVOX3jTv0k6Gil26TfsSUCRqXFqFRrlSXEgdJ76t7Y4g7FoyrqJHnt6iPxx54ewaoxN2dVpLJy4VkwWVwf2I+Z27OqxaugKvw3RQhV8WjXuAx5pXIVnrHYZU5saMBVL2aueBVIBGPvY0x9Fx84t7iJ54IA+7D59Qiw2lituwLueyxmVGIgtaDoOwIiRx+/qpSURjKViINED8XWSkpJQi8TPDEsSsYSXA8l9ekcQH2cOsBgkh3gPPlByFiiPDCLU2t1i4jhNF0ToVD23hp1R9H0JDvguXE3FGrEoq5JvgqOjUVDJ+rll8+Ywv5H6cGcbnnl831O++yLz8GybZlVgL7IAAAAAElFTkSuQmCC",
                }}
              />
            </Pressable>
          )}
          {passwordShow && (
            <Pressable
              style={styles.inputImage}
              onPress={() => setPasswordShow(!passwordShow)}
            >
              <Image
                style={styles.inputEyeSlash}
                source={{
                  uri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAACxLAAAsSwGlPZapAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAL/SURBVHgB7ZuBddowFEVfN2AEbVA2qEdgg/4R2ABv0G4AnYBu4HYC0gmUDegGrlXbhSqSLel/bBPrnfNOcoLz/HUjCSkWQFZWVlZW1pi2WLEOjevGn7FC9Y3vvSoIptvXDr8rCB9GXqfGR8/PvyFcBVqgH7uvm8bKuua18+/GPxu/NP6BBYiQ1hMKtPCunt8P8bXL2GFmEeIgXJDeaJ812jlJYSYRwiEotAXXD/JsIAjLgaC7eiYXYTkQjCvM0BsIy4JwxQy9gbAsCP3cMKkIcRDOjfe4rQV6me+L7rUKPAgXK1tECv6xRgiHEHO/E9IhaAjOCwq37usLJshDsO89CwTlKGBqCKY7nzEDBAU/fQkIm7v8S9dIgl8nTAjhvrjYYELcxOjqYZRYk8/RE2Nol3sUBOOD49ptYF0unxGoQ2TwIyF8cVx7iqxvDGpQ0XNC2Dmuqxn2bq0VeKu1755cAg+CWeba47di1HmFZ1Lk7uH38IvAg2Bn75m1VvZND8xA4wLDIqRDsHsXZzJ8A1UJhBnb3XQjCEE7srn1/hsKR4Gw2tEADdmJ0ZZEzRXA333VAwVKQnDlc33sb3AVCLO7vBaE4BpeEgBUH7gXCLOfH96vJiUg3Ktg1mpc2qEVM3DsrUoSgvjbIMAfCnboxpEnBSF1ezxUw1/tGMG1I3gXUQAhHIJC+qqVMKIyMdj46Mj7iuVAKBEoThdzHaYoMT+E4O2wkRm/qXsDDf8qUGMeCL6aBqWQPs6OA7mE9q+hMQ5MAoIPcpAU0iGcwf//PIEHgdX4oeCY4aDAEyENgkjjXcGpQ0IhXYQ4CBUe8MCUMzH2NoWZVVyBt4/Gtt1rZ0z73CFaJXgQOEOHsBAIBJkd5FNDUJD7X8LTQuiL0Vg5BIXHzg1PAcFIoQWhIQ/h4rknYWEQepmt8AkyByWLkXsREiGMHZWVUoH2ff4TbsdklXXNK9pjsi+NfyH+qCxB5ljvU4vg7gmr+rwD4f/Gl1ihCCtufK9Vf8wnKysrKytEfwDZJJThCnzIiQAAAABJRU5ErkJggg==",
                }}
              />
            </Pressable>
          )}
        </View>
        <View style={styles.inputBox}>
          <Text style={styles.label}>Confirm Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={(text) => setConfirmPassword(text)}
            value={confirmPassword}
          />
          {confirmPassword && password && confirmPassword === password && (
            <Image
              style={[styles.inputImage, { width: 20.67, height: 15.9 }]}
              source={{
                uri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADYAAAAoCAYAAAC1mQk2AAAACXBIWXMAACxLAAAsSwGlPZapAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAHBSURBVHgB1dlBTsJAFMbxNw0LlxwBlyYuZGF0KTfQG9ATGE5gPQFH6BW8AS5NXMjCRJcegSULsL6vQROEwsx0Ou/NPyGlQNL+0mQ6Uwwl3M1b2V+e0LQydIt9U9ETbx5fzvKvHiXa9Uc5WBLN+O2AQb+Nsc+vkaEEA4o2qH3fr9c0zCixjqGQyfgqUkLZoDadJnPFHFD14JHEFXNEFXijHuaDQqphviikFtYGhVTC2qKQOlgIFFIFC4VCamAhUUgFLDQKicO6QCFRWFcoJAbrEoVEYF2jUHRYDBSqYVef5T1vCl5i942heVXRHab+FLhYKGT4YA+8LbY+NLRYrWj0ep7PKVAxUQgLzfH/D/mK9Xs9ml2+lxcUoNgolDUdLBROAoUAe276si1OCoUyflQ14QeOi6Yf+OIkUageFXHSGZ88RsXGHzoMKNIo9HcfC4XTgEJbN+i2OC0otDPz8MVpQqG9UypXnDYUapwr2uLom3IeVaekCIUOToJtcJZFRaGjs/sAuOgoZLVsaYETQSHr9ZgHTgyFnBaaDjhRFHJeQVvgxFHI69HAAZwKFPL6RxM3ZUYN+f5VzzywOuD9iRYU+gEFuzApiTpDSwAAAABJRU5ErkJggg==",
              }}
            />
          )}
        </View>

        <Text
          style={{
            color: "red",
            fontFamily: "ManropeBold",
          }}
        >
          {serverErr}
        </Text>

        <TouchableOpacity
          style={[
            styles.btn,
            password &&
            preference &&
            email &&
            password === confirmPassword &&
            !isLoading
              ? { backgroundColor: "#000000" }
              : { backgroundColor: "#f2f2f2" },
          ]}
          onPress={handleLogin}
          disabled={!password || !email}
        >
          <Text style={styles.btnText}>Sign Up</Text>
          {isLoading && <ActivityIndicator size={"large"} />}
        </TouchableOpacity>
        <View>
          <Text
            style={[
              styles.authLink,
              {
                marginTop: 30,
                color: "#000",
              },
            ]}
          >
            Have an account?{" "}
            <Text
              onPress={() => navigation?.navigate("LoginScreen")}
              style={[styles.authLink]}
            >
              Login
            </Text>
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 500,
    maxWidth: "100%",
    height: 200,
    resizeMode: "contain", // or 'contain' or 'stretch' or 'center'
  },
  container: {
    justifyContent: "space-between",
    paddingVertical: 20,
    height: "100%",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  containerInner: {
    height: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  body: {
    gap: 10,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  label: {
    marginBottom: 5,
    color: "#8F92A1",
    fontFamily: "ManropeRegular",
    fontSize: scaleFont(14),
  },
  header: {
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginBottom: -0,
    maxWidth: 314,
  },
  headerText: {
    fontSize: scaleFont(30),
    fontFamily: "ManropeBold",
    maxWidth: 188,
    color: "#000",
    textAlign: "left",
  },
  headerLine: {
    height: 3,
    width: 26.74,
    marginTop: 5,
    borderRadius: 2,
    backgroundColor: "#000000",
  },
  inputBox: {
    position: "relative",
    width: "100%",
    maxWidth: 314,
  },
  input: {
    fontFamily: "ManropeMedium",
    width: "100%",
    height: 48,
    borderRadius: 10,
    backgroundColor: "#f6f6f7",
    color: "#030319",
    fontSize: scaleFont(15),
    paddingHorizontal: 10,
  },
  inputImage: {
    position: "absolute",
    right: 10,
    top: 42,
    zIndex: 10,
  },
  inputEye: {
    width: 22.67,
    height: 15.9,
  },
  inputEyeSlash: {
    width: 22.67,
    height: 16.5,
  },
  authLink: {
    fontSize: scaleFont(16),
    marginTop: 10,
    fontFamily: "ManropeSemiBold",
    color: "#000000",
    textAlign: "center",
  },
  btn: {
    maxWidth: 314,
    fontFamily: "ManropeRegular",
    marginTop: 30,
    borderRadius: 8,
    width: "100%",
    height: 56,
    display: "flex",
    flexDirection: "row",
    gap: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#CCC7FF",
  },
  btnText: {
    fontSize: scaleFont(16),
    fontFamily: "ManropeSemiBold",
    color: "#fff",
  },
});

export default SignUpScreen;
