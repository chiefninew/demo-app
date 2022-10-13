import Reactotron from "reactotron-react-native"

Reactotron
    // Your real ip address 👇
  .configure({ host: '192.168.56.1' })
  .useReactNative()
  .connect()