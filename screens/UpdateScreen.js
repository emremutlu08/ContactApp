import React from "react";
import { View, StyleSheet, Text } from "react-native";

import { TextInput, Button } from "react-native-paper"
import { firebaseApp } from "../util/Firebase";


export default class UpdateScreen extends React.Component {

    state = {
        name: "",
        phone: "",
        id: ""
    }

    componentDidMount() {
        const id = this.props.route.params.id
        const name = this.props.route.params.name
        const phone = this.props.route.params.phone

        this.setState({
            id,
            name,
            phone
        })
    }

    render() {
        return(
            <View style={styles.container}>
                <TextInput
                    value={this.state.name}
                    label="Name"
                    onChangeText={(text)=>this.setState({name: text})}
                    style={{
                        margin: 10,
                    }}
                />
                <TextInput
                    value={this.state.phone}
                    label="Phone"
                    onChangeText={(text)=>this.setState({phone: text})}
                    keyboardType="phone-pad"
                    style={{
                        margin: 10,
                    }}
                />
                <Button
                    onPress={()=>{
                        
                        if(this.state.name != "" &&
                            this.state.phone != ""
                        ) {
                          
                            const user = firebaseApp.auth().currentUser

                            firebaseApp.firestore()
                            .collection("data")
                            .doc(user.uid)
                            .collection("contacts")
                            .doc(this.state.id)
                            .update({
                                name: this.state.name,
                                phone: this.state.phone
                            }).then(()=>{
                                this.props.navigation.goBack()
                            })

                        } else {
                            alert("Provide information")
                        }

                    }}
                    mode="contained"
                    style={{
                        margin: 10,
                    }}
                >
                    Save
                </Button>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    }
})