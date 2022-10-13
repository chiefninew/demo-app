import Reactotron from "reactotron-react-native"

Reactotron
    // Your real ip address 👇
  .configure({ host: '192.168.2.78' })
  .useReactNative()
  .connect()