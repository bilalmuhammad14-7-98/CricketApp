import { StatusBar } from "expo-status-bar";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer, useFocusEffect } from "@react-navigation/native";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { Avatar, Modal, Portal } from "react-native-paper";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

//import icons
import {
  Ionicons,
  AntDesign,
  Feather,
  FontAwesome,
  Entypo,
  Fontisto,
  MaterialIcons,
} from "react-native-vector-icons";
import { windowHeight, windowWidth } from "../../config/dimensions";
import images from "../../config/images";
import { sizes } from "../../config/sizes";

// imports
import Marketplace from "../../screens/playerPanel/Marketplace";
import PlayerHome from "../../screens/playerPanel/PlayerHome";
import TeamsScreen from "../../screens/playerPanel/Teams";
import UserProfile from "../../screens/playerPanel/UserProfile";
import PlayersScreen from "../../screens/playerPanel/Players";
import PlayerRequests from "../../screens/playerPanel/PlayerRequests";
import Profile from "../../screens/ProfileScreen/Profile";
import CricketProfile from "../../screens/ProfileScreen/CricketProfile";
import EditProfile from "../../screens/ProfileScreen/EditProfile";
import NavigationHeader from "./NavigationHeader";
import Umpire from "../../screens/playerPanel/Umpire";

import CreateTeam from "../../screens/teamScreens/CreateTeam";
import ScheduleMatch from "../../screens/teamScreens/ScheduleMatch";
import InviteList from "../../screens/teamScreens/InviteList";
import RecivedInviteList from "../../screens/teamScreens/RecivedInviteList";
import AllPlayer from "../../screens/playerPanel/AllPlayer";
import PlayerDetail from "../../screens/playerPanel/PlayerDetail";
import Gallery from "../../screens/playerPanel/Gallery";
import MyPlayerDetail from "../../screens/playerPanel/MyPlayerDetail";
import TeamList from "../../screens/playerPanel/TeamList";
import ViewMarketplace from "../../screens/playerPanel/ViewMarketplace";
import ViewMarketplaceDetail from "../../screens/playerPanel/ViewMarketplaceDetail";
import Request from "../../screens/UmpireScreens/Request";
import ScheduleMatches from "../../screens/playerPanel/ScheduleMatches";
import UmpireDetails from "../../screens/playerPanel/UmpireDetails";
import { apiActiveURL, imageURL, SCREEN_WIDTH } from "../../ApiBaseURL";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useCallback, useEffect } from "react";
import { setNotification } from "../../store/actions";
import { useState } from "react";
import { getMonths, showToast } from "../../util";
import CustomToast from "../formComponents/CustomToast";
import ViewMyMarketplace from "../../screens/playerPanel/ViewMyMarketplace";
import UmpireProfile from "../../screens/ProfileScreen/UmpireProfile";
import RecruiterProfile from "../../screens/ProfileScreen/RecruiterProfile";
const upper_margin = windowWidth * 0.001;
const upper_margin1 = windowWidth * 0.01;
const LOGO_SIZE = windowHeight * 0.06;
const LOGO_SIZE1 = windowHeight * 0.15;
const logo_margin = windowWidth * 0.02;
const logo_size = windowHeight * 0.04;

const Tab = createBottomTabNavigator();
const StackPlayerHome = createNativeStackNavigator();
const StackTeams = createNativeStackNavigator();
const StackUserProfile = createNativeStackNavigator();
const StackMarketPlace = createNativeStackNavigator();

const NotiIcon = () => {
  const [count, setCount] = useState(0);
  const [visible, setVisible] = useState(false);
  const [loader, setLoader] = useState(false);
  const [notification, setNotification] = useState([]);
  const showModal = (data) => {
    setVisible(true);
  };
  const [toast, setToast] = useState({
    show: false,
    message: "",
  });

  useEffect(() => {
    setTimeout(function hideToast() {
      setToast({ ...toast, show: false, message: "" });
    }, 500);
  }, []);
  // const messageObject = JSON.parse(notification.message);
  const hideModal = () => setVisible(false);

  const getDate = (dateString) => {
    const date = new Date(dateString);

    // Format the date
    const formattedDate = `${date.getDate()} ${
      getMonths[date.getMonth()]
    } ${date.getFullYear()}`;

    // Format the time
    const hour = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const amPm = hour >= 12 ? "pm" : "am";
    const formattedTime = `${hour % 12 || 12}:${minutes} ${amPm}`;
    return `${formattedDate} - ${formattedTime}`;
  };

  const dispatch = useDispatch();
  const userLoginSuccess = useSelector((state) => {
    return state.loginData.data;
  });

  const getAllNotification = () => {
    let config = {
      method: "GET",
      // maxBodyLength: Infinity,
      url: `${apiActiveURL}list-notifications`,
      headers: {
        Authorization: `Bearer ${userLoginSuccess.token}`,
      },
    };
    axios
      .request(config)
      .then((response) => {
        setLoader(false);
        if (response.data?.success) {
          // dispatch(setNotification(response.data?.notifications));
          if (response.data?.notifications == 0) {
            showToast("No Notifications Availible", "error");
            hideModal();
          } else {
            setNotification(response.data?.notifications);
          }
        }
      })
      .catch((error) => {
        setLoader(false);
      });
  };

  const handleNotificationPress = (item) => {
    var index = notification.findIndex(
      (n) => n.notification_id === item.notification_id
    );

    if (index != -1) {
      notification.splice(index, 1);
    }
    ReadNotification(item.notification_id);

    setNotification([...notification]);
  };

  const ReadNotification = (id) => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${apiActiveURL}mark-as-read?notification_id=${id}`,
      headers: {
        Authorization: `Bearer ${userLoginSuccess.token}`,
      },
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useFocusEffect(
    useCallback(() => {
      getNotificationCount();
    }, [notification])
  );
  const getNotificationCount = () => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${apiActiveURL}count-notifications`,
      headers: {
        Authorization: `Bearer ${userLoginSuccess.token}`,
      },
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        if (response.data.success) {
          setCount(response.data.notifications);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <TouchableOpacity
      style={{ marginRight: upper_margin1 }}
      onPress={() => {
        if (userLoginSuccess) {
          setLoader(true);
          showModal();
          getAllNotification();
        }
      }}
    >
      {count != 0 && (
        <View
          style={{
            backgroundColor: "#2BB789",
            marginBottom: -5,
            borderRadius: 100,
          }}
        >
          <Text style={{ color: "#fff", textAlign: "center" }}>{count}</Text>
        </View>
      )}
      <Ionicons name="notifications" size={logo_size} color="#2BB789" />
      <CustomToast show={toast.show} message={toast.message} />
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={{
            ...styles.modalStyles,
            maxHeight: "90%",
          }}
        >
          <Text style={[styles.text, { textAlign: "center", fontSize: 20 }]}>
            Notifications
          </Text>
          {loader ? (
            <ActivityIndicator
              size="large"
              color="#000"
              style={{ marginTop: 10 }}
            />
          ) : notification.length == 0 ? (
            <Text
              style={{
                color: "red",
                fontSize: 16,
                fontWeight: "bold",
                textAlign: "center",
                marginTop: 10,
              }}
            >
              Not notification availible:(
            </Text>
          ) : (
            <FlatList
              showsVerticalScrollIndicator={false}
              data={notification}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity
                    style={{
                      backgroundColor: "#dfdfdf",
                      padding: 10,
                      borderRadius: 20,
                      marginTop: 10,
                    }}
                    onPress={() => handleNotificationPress(item)}
                  >
                    <Text
                      style={{
                        color: "#000",
                        fontSize: 16,
                        fontWeight: "bold",
                      }}
                    >
                      {item?.message}
                    </Text>
                    <Text style={{ color: "#000", fontSize: 12, marginTop: 5 }}>
                      {getDate(item["created_at "])}
                    </Text>
                  </TouchableOpacity>
                );
              }}
              // keyExtractor={(item) => `${item.id}`}
            />
          )}
        </Modal>
      </Portal>
    </TouchableOpacity>
  );
};
function PlayerHomeNavigationContainer() {
  const { notification } = useSelector((state) => state.auth);
  const userLoginSuccess = useSelector((state) => {
    return state.loginData.data;
  });
  console.log(
    userLoginSuccess,
    "userLoginSuccessuserLoginSuccessuserLoginSuccess"
  );
  return (
    <StackPlayerHome.Navigator screenOptions={{ headerShown: true }}>
      <StackPlayerHome.Screen
        name="PlayerHome"
        component={PlayerHome}
        options={({}) => ({
          title: "",
          headerRight: () => {
            return <NotiIcon notification={notification} />;
          },

          headerLeft: () => {
            return (
              <View style={styles.profile}>
                <Avatar.Image
                  size={LOGO_SIZE}
                  source={
                    userLoginSuccess?.data?.profileImg
                      ? {
                          uri: `${userLoginSuccess?.data?.profileImg}`,
                        }
                      : images.FypLogo
                  }
                />
              </View>
            );
          },

          headerStyle: {
            backgroundColor: "#FAF9F6",
            elevation: 0,
            // height: LOGO_SIZE1,
          },
        })}
      />

      <StackPlayerHome.Screen
        name="PlayersScreen"
        component={PlayersScreen}
        options={({ navigation }) => ({
          title: "",
          headerLeft: () => {
            return (
              <NavigationHeader
                title={"Players List"}
                navigation={navigation}
              />
            );
          },
          headerStyle: {
            backgroundColor: "#FAF9F6",
            elevation: 0,
          },
        })}
      />

      <StackPlayerHome.Screen
        name="TeamList"
        component={TeamList}
        options={({ navigation }) => ({
          title: "",
          headerLeft: () => {
            return (
              <NavigationHeader
                title={"Players List"}
                navigation={navigation}
              />
            );
          },
          headerStyle: {
            backgroundColor: "#FAF9F6",
            elevation: 0,
          },
        })}
      />
      <StackPlayerHome.Screen
        name="AllPlayersScreen"
        component={AllPlayer}
        options={({ navigation }) => ({
          title: "",
          headerLeft: () => {
            return (
              <NavigationHeader
                title={"All Players List"}
                navigation={navigation}
              />
            );
          },
          headerStyle: {
            backgroundColor: "#FAF9F6",
            elevation: 0,
          },
        })}
      />

      <StackPlayerHome.Screen
        name="ScheduleMatches"
        component={ScheduleMatches}
        options={({ navigation }) => ({
          title: "",
          headerLeft: () => {
            return (
              <NavigationHeader
                title={"Matches Scheduled"}
                navigation={navigation}
              />
            );
          },
          headerStyle: {
            backgroundColor: "#FAF9F6",
            elevation: 0,
          },
        })}
      />

      <StackPlayerHome.Screen
        name="PlayerDetailsScreen"
        component={PlayerDetail}
        options={({ navigation }) => ({
          title: "",
          headerLeft: () => {
            return (
              <NavigationHeader
                title={"View Profile Details"}
                navigation={navigation}
              />
            );
          },
          headerStyle: {
            backgroundColor: "#FAF9F6",
            elevation: 0,
          },
        })}
      />
      <StackPlayerHome.Screen
        name="MyPlayerDetail"
        component={MyPlayerDetail}
        options={({ navigation }) => ({
          title: "",
          headerLeft: () => {
            return (
              <NavigationHeader
                title={"View Profile Details"}
                navigation={navigation}
              />
            );
          },
          headerStyle: {
            backgroundColor: "#FAF9F6",
            elevation: 0,
          },
        })}
      />
      <StackPlayerHome.Screen
        name="Gallery"
        component={Gallery}
        options={({ navigation }) => ({
          title: "",
          headerLeft: () => {
            return (
              <NavigationHeader title={"Gallery"} navigation={navigation} />
            );
          },
          headerStyle: {
            backgroundColor: "#FAF9F6",
            elevation: 0,
          },
        })}
      />
      <StackPlayerHome.Screen
        name="Request"
        component={Request}
        options={({ navigation }) => ({
          title: "",
          headerLeft: () => {
            return (
              <NavigationHeader
                title={"Umpiring Request"}
                navigation={navigation}
              />
            );
          },
          headerStyle: {
            backgroundColor: "#FAF9F6",
            elevation: 0,
          },
        })}
      />

      <StackPlayerHome.Screen
        name="PlayerRequest"
        component={PlayerRequests}
        options={({ navigation }) => ({
          title: "",
          headerLeft: () => {
            return (
              <NavigationHeader
                title={"Players Request"}
                navigation={navigation}
              />
            );
          },
          // headerRight: () => {
          //   return (
          //     <View style={{ marginRight: upper_margin1 }}>
          //       <Ionicons
          //         name="notifications"
          //         size={logo_size}
          //         color="#2BB789"
          //       />
          //     </View>
          //   );
          // },
          headerStyle: {
            backgroundColor: "#FAF9F6",
            elevation: 0,
          },
        })}
      />

      <StackPlayerHome.Screen
        name="Umpire"
        component={Umpire}
        options={({ navigation }) => ({
          title: "",
          headerLeft: () => {
            return (
              <NavigationHeader title={"Umpire"} navigation={navigation} />
            );
          },
          headerStyle: {
            backgroundColor: "#FAF9F6",
            elevation: 0,
          },
        })}
      />

      <StackPlayerHome.Screen
        name="umpireprofile"
        component={UmpireProfile}
        options={({ navigation }) => ({
          title: "",
          headerLeft: () => {
            return (
              <NavigationHeader
                title={"Umpire Details"}
                navigation={navigation}
              />
            );
          },
          headerStyle: {
            backgroundColor: "#FAF9F6",
            elevation: 0,
          },
        })}
      />
      <StackPlayerHome.Screen
        name="recruiterprofile"
        component={RecruiterProfile}
        options={({ navigation }) => ({
          title: "",
          headerLeft: () => {
            return (
              <NavigationHeader
                title={"Recruiter Details"}
                navigation={navigation}
              />
            );
          },
          headerStyle: {
            backgroundColor: "#FAF9F6",
            elevation: 0,
          },
        })}
      />
    </StackPlayerHome.Navigator>
  );
}

function TeamsScreenNavigationContainer() {
  return (
    <StackTeams.Navigator screenOptions={{ headerShown: true }}>
      <StackTeams.Screen
        name="TeamsScreen"
        component={TeamsScreen}
        options={({ navigation }) => ({
          title: "",
          headerLeft: () => {
            return <NavigationHeader title={"Teams"} navigation={navigation} />;
          },

          headerStyle: {
            backgroundColor: "#FAF9F6",
            elevation: 0,
          },
        })}
      />

      <StackTeams.Screen
        name="CreateTeam"
        component={CreateTeam}
        options={({ navigation }) => ({
          title: "",
          headerLeft: () => {
            return (
              <NavigationHeader title={"Create Team"} navigation={navigation} />
            );
          },
          // headerRight: () => {
          //   return (
          //     <View style={{ marginRight: upper_margin1 }}>
          //       <Ionicons
          //         name="notifications"
          //         size={logo_size}
          //         color="#2BB789"
          //       />
          //     </View>
          //   );
          // },

          headerStyle: {
            backgroundColor: "#FAF9F6",
            elevation: 0,
          },
        })}
      />

      <StackTeams.Screen
        name="ScheduleMatch"
        component={ScheduleMatch}
        options={({ navigation }) => ({
          title: "",
          headerLeft: () => {
            return (
              <NavigationHeader
                title={"Schedule a Match"}
                navigation={navigation}
              />
            );
          },

          headerStyle: {
            backgroundColor: "#FAF9F6",
            elevation: 0,
          },
        })}
      />

      <StackTeams.Screen
        name="InviteList"
        component={InviteList}
        options={({ navigation }) => ({
          title: "",
          headerLeft: () => {
            return (
              <NavigationHeader title={"Invite List"} navigation={navigation} />
            );
          },

          headerStyle: {
            backgroundColor: "#FAF9F6",
            elevation: 0,
          },
        })}
      />

      <StackTeams.Screen
        name="RecivedInviteList"
        component={RecivedInviteList}
        options={({ navigation }) => ({
          title: "",
          headerLeft: () => {
            return (
              <NavigationHeader
                title={"Received Invite List"}
                navigation={navigation}
              />
            );
          },

          headerStyle: {
            backgroundColor: "#FAF9F6",
            elevation: 0,
          },
        })}
      />
    </StackTeams.Navigator>
  );
}

function UserProfileNavigationContainer() {
  return (
    <StackUserProfile.Navigator screenOptions={{ headerShown: true }}>
      <StackUserProfile.Screen
        name="UserProfile"
        component={UserProfile}
        options={({ navigation }) => ({
          title: "",
          headerLeft: () => {
            return (
              <NavigationHeader
                title={"User Profile"}
                navigation={navigation}
              />
            );
          },
          headerStyle: {
            backgroundColor: "#FAF9F6",
            elevation: 0,
          },
        })}
      />
      <StackUserProfile.Screen
        name="Profile"
        component={Profile}
        options={({ navigation }) => ({
          title: "",
          headerLeft: () => {
            return (
              <NavigationHeader title={"Profile"} navigation={navigation} />
            );
          },
          headerStyle: {
            backgroundColor: "#FAF9F6",
            elevation: 0,
          },
        })}
      />
      <StackUserProfile.Screen
        name="CricketProfile"
        component={CricketProfile}
        options={({ navigation }) => ({
          title: "",
          headerLeft: () => {
            return (
              <NavigationHeader
                title={"Cricket Profile"}
                navigation={navigation}
              />
            );
          },
          headerStyle: {
            backgroundColor: "#FAF9F6",
            elevation: 0,
          },
        })}
      />

      <StackUserProfile.Screen
        name="umpireprofile"
        component={UmpireProfile}
        options={({ navigation }) => ({
          title: "",
          headerLeft: () => {
            return (
              <NavigationHeader
                title={"Umpire Profile"}
                navigation={navigation}
              />
            );
          },
          headerStyle: {
            backgroundColor: "#FAF9F6",
            elevation: 0,
          },
        })}
      />
      <StackUserProfile.Screen
        name="EditProfile"
        component={EditProfile}
        options={({ navigation }) => ({
          title: "",
          headerLeft: () => {
            return (
              <NavigationHeader
                title={"Edit Profile"}
                navigation={navigation}
              />
            );
          },
          headerStyle: {
            backgroundColor: "#FAF9F6",
            elevation: 0,
          },
        })}
      />
    </StackUserProfile.Navigator>
  );
}

function MarketPlaceNavigationContainer() {
  return (
    <StackMarketPlace.Navigator screenOptions={{ headerShown: true }}>
      <StackMarketPlace.Screen
        name="ViewMarketplace"
        component={ViewMarketplace}
        screenOptions={{ headerShown: false }}
        options={({ navigation }) => ({
          // title: "All Marketplaces",
          headerLeft: () => {
            return (
              <NavigationHeader
                title={"View Market Place"}
                navigation={navigation}
              />
            );
          },

          headerStyle: {
            backgroundColor: "#FAF9F6",
            elevation: 0,
          },
        })}
      />
      <StackMarketPlace.Screen
        name="ViewMyMarketplace"
        component={ViewMyMarketplace}
        screenOptions={{ headerShown: false }}
        options={({ navigation }) => ({
          // title: "All Marketplaces",
          headerLeft: () => {
            return (
              <NavigationHeader
                title={"View Market Place"}
                navigation={navigation}
              />
            );
          },

          headerStyle: {
            backgroundColor: "#FAF9F6",
            elevation: 0,
          },
        })}
      />
      <StackMarketPlace.Screen
        name="MarketPlace"
        component={Marketplace}
        options={({ navigation }) => ({
          // title: "",
          headerLeft: () => {
            return (
              <NavigationHeader
                title={"Market Place"}
                navigation={navigation}
              />
            );
          },

          headerStyle: {
            backgroundColor: "#FAF9F6",
            elevation: 0,
          },
        })}
      />

      <StackMarketPlace.Screen
        name="ViewMarketplaceDetail"
        component={ViewMarketplaceDetail}
        options={({ navigation }) => ({
          // headerTitle="kmdsdsk",
          // title: "All Marketplaces",
          headerLeft: () => {
            return (
              <NavigationHeader
                title={"All MarketPlace"}
                navigation={navigation}
              />
            );
          },

          headerStyle: {
            backgroundColor: "#FAF9F6",
            elevation: 0,
          },
        })}
      />
    </StackMarketPlace.Navigator>
  );
}

export default function CustomBottomTabNavigator() {
  const userLoginSuccess = useSelector((state) => {
    return state.loginData.data;
  });
  return (
    <>
      <StatusBar style="dark-content" />
      <Tab.Navigator
        screenOptions={{
          tabBarShowLabel: false,
          headerShown: true,
          tabBarStyle: {
            backgroundColor: "#fff",
            position: "absolute",
            // bottom: 8,
            // left: 8,
            // right: 8,
            borderRadius: sizes.m35,
            height: sizes.bottomTabHeight,
          },
          tabBarHideOnKeyboard: true,
          // ...styles.shadow,
        }}
      >
        <Tab.Screen
          name="PlayerHomeRoot"
          component={PlayerHomeNavigationContainer}
          options={{
            headerShown: false,
            title: "",
            tabBarIcon: ({ focused }) => (
              <View style={styles.icon}>
                <Ionicons
                  name="home-outline"
                  size={23}
                  color={focused ? "#2BB789" : "grey"}
                />
              </View>
            ),
          }}
        />

        {userLoginSuccess?.data?.roleId != "umpire" && (
          <Tab.Screen
            name="TeamsScreenRoot"
            component={TeamsScreenNavigationContainer}
            options={{
              headerShown: false,
              title: "",
              tabBarIcon: ({ focused }) => (
                <View style={styles.icon}>
                  <AntDesign
                    name="team"
                    size={23}
                    color={focused ? "#2BB789" : "grey"}
                  />
                </View>
              ),
              headerStyle: {
                backgroundColor: "#FAF9F6",
                elevation: 0,
              },
            }}
          />
        )}

        {/* <Tab.Screen
          name="MarketPlace"
          component={Marketplace}
          options={{
            title: "",
            tabBarIcon: ({ focused }) => (
              <View style={styles.icon}>
                <Feather
                  name="shopping-bag"
                  size={23}
                  color={focused ? "#2BB789" : "grey"}
                />
              </View>
            ),
            headerRight: () => (
              <NotiIcon/>
            ),
            headerLeft: () => (
              <View style={styles.header}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <TouchableOpacity
                    style={{
                      width: 33,
                      height: 33,
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: 20,
                      backgroundColor: "#2BB789",
                      opacity: 0.6,
                      marginLeft: upper_margin,
                    }}
                  >
                    <Ionicons
                      name="ios-chevron-back"
                      size={28}
                      color="#fff"
                      resizeMode="contain"
                    />
                  </TouchableOpacity>

                  <Text
                    style={{
                      fontSize: 24,
                      marginLeft: sizes.m10,
                      fontWeight: "bold",
                      color: "#2BB789",
                    }}
                  >
                    MarketPlace
                  </Text>
                </View>
              </View>
            ),
            headerStyle: {
              backgroundColor: "#FAF9F6",
              elevation: 0,
            },
          }}
        /> */}
        <Tab.Screen
          name="MarketPlaceRoot"
          component={MarketPlaceNavigationContainer}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <View style={styles.icon}>
                <FontAwesome
                  name="shopping-bag"
                  size={23}
                  color={focused ? "#2BB789" : "grey"}
                />
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="UserProfileRoot"
          component={UserProfileNavigationContainer}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <View style={styles.icon}>
                <FontAwesome
                  name="user-circle"
                  size={23}
                  color={focused ? "#2BB789" : "grey"}
                />
              </View>
            ),
          }}
        />
      </Tab.Navigator>
    </>
  );
}

const styles = StyleSheet.create({
  // shadow: {
  //   shadowColor: "#000",
  //   shadowOpacity: 0.25,
  //   shadowRadius: 3.5,
  //   shadowOffset: {
  //     width: 0,
  //     height: 10,
  //   },
  //   elevation: 5,
  // },

  icon: {
    position: "absolute",
    paddingLeft: 10,
  },

  header: {
    paddingVertical: 20,
    flexDirection: "row",
    alignItems: "center",
    // marginHorizontal: 20,
    paddingHorizontal: 10,
    justifyContent: "space-between",
  },

  profile: {
    flexDirection: "row",
    justifyContent: "center",
    marginLeft: logo_margin,
    // paddingTop: 3,
    // flex: 1,
  },
  modalStyles: {
    alignSelf: "center",
    backgroundColor: "#FFFFFF",
    width: SCREEN_WIDTH - 20,
    borderRadius: 15,
    padding: 25,
  },
});
