import React from "react";
import { View, StyleSheet, Text, FlatList, TouchableOpacity, Linking } from "react-native";

import { Button, FAB, ActivityIndicator } from "react-native-paper";

import { firebaseApp } from "../util/Firebase";

import { MaterialIcons } from "@expo/vector-icons";

export default class HomeScreen extends React.Component {

    state = {
        contacts: [],
        isLoaded: false,
    }

    componentDidMount() {
        this.props.navigation.setOptions({
            headerRight: () => (
                <Button
                    icon="logout"
                    onPress={() => {

                        firebaseApp.auth().signOut()
                            .then(() => {
                                this.props.navigation.replace("LoginScreen")
                            })
                            .catch(error => console.log(error))

                    }}
                />
            )
        })

        this.getAllContacts()


        this.props.navigation.addListener("focus", ()=>{
            this.getAllContacts()
        })
    }

    getAllContacts() {
        const user = firebaseApp.auth().currentUser

        firebaseApp.firestore()
            .collection("data")
            .doc(user.uid)
            .collection("contacts")
            .get()
            .then(querySnapshot => {

                const contacts = []

                querySnapshot.forEach(snapshot => {

                    contacts.push({
                        id: snapshot.id,
                        name: snapshot.data().name,
                        phone: snapshot.data().phone
                    })

                })

                this.setState({
                    isLoaded: true,
                    contacts: contacts
                })

            })
    }


    render() {
        if (this.state.isLoaded) {
            return (
                <View style={styles.container}>

                    <FlatList
                        data={this.state.contacts}
                        keyExtractor={(item, index) => item.id}
                        renderItem={({ item }) => {
                            return (
                                <TouchableOpacity
                                    onPress={() => { 

                                        this.props.navigation.navigate("UpdateScreen", {
                                            id: item.id,
                                            name: item.name,
                                            phone: item.phone
                                        })

                                    }}
                                >

                                    <View
                                        style={{
                                            backgroundColor: "#dedede",
                                            marginTop: 10,
                                            marginHorizontal: 20,
                                            padding: 20,
                                            borderRadius: 8,
                                            flexDirection: "row",
                                            justifyContent: "space-between",
                                            alignItems: "center"
                                        }}
                                    >

                                        <View>
                                            <Text
                                                style={{
                                                    fontSize: 18,
                                                    fontWeight: "bold"
                                                }}
                                            >{item.name}</Text>
                                            <Text
                                                style={{
                                                    marginTop: 5
                                                }}
                                            >{item.phone}</Text>
                                        </View>

                                        <View
                                            style={{
                                                flexDirection: "row"
                                            }}
                                        >
                                        <TouchableOpacity onPress={()=>{
                                            const user = firebaseApp.auth().currentUser
                                            console.log(user.uid)
                    
                                            firebaseApp.firestore().collection("data")
                                            .doc(user.uid)
                                            .collection("contacts")
                                            .doc(item.id)
                                            .delete()

                                            // remove from state

                                            let contacts = this.state.contacts

                                            contacts = contacts.filter(c=>c.id !== item.id)

                                            this.setState({
                                                contacts: contacts
                                            })

                                        }}
                                        style={{
                                            marginEnd: 10
                                        }}
                                        >

                                            <MaterialIcons
                                                name="delete"
                                                size={32}
                                                color="#FF0000"
                                            />

                                        </TouchableOpacity>

                                        <TouchableOpacity onPress={()=>{
                                            Linking.openURL(`tel:${item.phone}`)
                                        }}>

                                            <MaterialIcons
                                                name="call"
                                                size={32}
                                                color="#333"
                                            />

                                        </TouchableOpacity>
                                        </View>
                                        
                                    </View>
                                </TouchableOpacity>

                            )
                        }}
                    />

                    <FAB
                        icon="plus"
                        style={styles.fab}
                        onPress={() => {
                            this.props.navigation.navigate("AddScreen")
                        }}

                    />
                </View>
            );
        } else {
            return (
                <View style={styles.container}>
                    <ActivityIndicator size="large" />
                </View>
            )
        }
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    fab: {
        position: "absolute",
        right: 0,
        bottom: 0,
        margin: 16
    }
})