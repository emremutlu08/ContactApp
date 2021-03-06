import React from "react";
import { View, StyleSheet, Text } from "react-native";

import { Button, TextInput } from "react-native-paper"

import { firebaseApp } from "../util/Firebase";

export default class LoginScreen extends React.Component {

    state = {
        email: "",
        password: "",
        isLoggedIn: false
    }
    
    componentDidMount() {
       

        firebaseApp.auth().onAuthStateChanged(result=>{
            if(result) {
                this.props.navigation.replace("HomeScreen")
            }
        })
    }

    render() {
        return(
            <View style={styles.container}>
                
                <Text
                style={{
                    marginTop: 50,
                    fontSize: 50,
                    textAlign: "center"
                }}>
                    Sign In
                </Text>

                <View
                    style={{
                        marginTop: 50,
                        marginHorizontal: 20
                    }}
                >

                    <TextInput
                        label="Email"
                        keyboardType="email-address"
                        value={this.state.email}
                        onChangeText={ (text) => this.setState({email: text}) }
                    />

                    <TextInput
                        style={{
                            marginTop: 10
                        }}
                        label="Password"
                        keyboardType="visible-password"
                        secureTextEntry={true}
                        value={this.state.password}
                        onChangeText={ (text) => this.setState({password: text}) }
                    />

                    <Button
                        onPress={()=>{

                            if(
                                this.state.email != "" &&
                                this.state.password != ""
                            ) {

                                firebaseApp.auth().signInWithEmailAndPassword(
                                    this.state.email,
                                    this.state.password
                                ).then(result=>{
                                    console.log(result)
                                    this.props.navigation.replace("HomeScreen")
                                }).catch(error=>{
                                    alert(error)
                                })

                            } else {
                                alert("Provide information")
                            }

                        }}
                        mode="contained"
                        style={{
                            marginTop: 20
                        }}
                    >
                        Login Now
                    </Button>

                    <Button
                        onPress={()=>{
                            this.props.navigation.navigate("SignupScreen")
                        }}
                        style={{
                            marginTop: 20
                        }}
                    >
                        New user? signup now
                    </Button>

                </View>

            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    }
})