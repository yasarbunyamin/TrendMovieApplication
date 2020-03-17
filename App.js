import React from "react";
import { Text, View, StyleSheet, FlatList,Image } from "react-native";


const bearerToken = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMTI2NDc3MTAyMTRmNTJjYTYzOWZmNjlhNzlkMTE4YyIsInN1YiI6IjVlNzBlNDAzZjlhYTQ3MDAxN2NmMDE2NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jxLu3VH9YBgPGlecjV9kCd4POyEWR4-ajc-Tq0-v1i4'
class MyMovieItem extends React.Component {
constructor(props) {
super(props);
}
render(){
const {item} = this.props
return(
<View style={{flexDirection:"row", margin:10}}>
  <Image style={{height:50,width:50}} source={{uri: "https://image.tmdb.org/t/p/w500/"+ item.backdrop_path}} />
    <Text style={{marginLeft: 10}}>{item.title}</Text>
</View>)
}
}
export default class App extends React.Component {
constructor(props) {
super(props);
this.state = {
movies: []
};
}
componentDidMount(){
this.fetchMovies()
}
fetchMovies() {
fetch("https://api.themoviedb.org/3/trending/all/week" , {
  method : 'GET',
  headers : new Headers({
    'Authorization': 'Bearer ' + bearerToken, 
    'Content-Type': 'application/json;charset=utf-8'
  })
})
.then((response) => response.json())
.then((responseJson) => {
this.setState({ movies: responseJson });
}).catch((error) => {
console.log('FAIL');
});
}
render() {
const {movies} = this.state
return (
<View style={styles.container}>{movies && movies.results && movies.results.length>0?
    (<FlatList data={movies.results} renderItem={({ item }) => 
      <MyMovieItem item={item} />} keyExtractor={(key) => key}
></FlatList>) : null}
</View>
);
}
}
const styles = StyleSheet.create({
container: {
flex: 1,
justifyContent: "center",
padding: 1,
},
});