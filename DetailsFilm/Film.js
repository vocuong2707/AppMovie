import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { TouchableOpacity, StyleSheet, FlatList, Text, View, ImageBackground, ActivityIndicator, Pressable, SafeAreaView, Image } from 'react-native';
import { ScrollView } from 'react-native-web';
import YoutubeIframe from 'react-native-youtube-iframe';
export default function App() {
    const [dataCast, setDataCast] = useState([]);
    const [dataReview, setDataReview] = useState([]);
    const [isLoadReview, setLoadReview] = useState(true)
    const [dataFilm, setData] = useState({});
    const [isLoading, setLoading] = useState(true);
    const [playRef, setPlayRef] = useState();
    const [isLoad, setLoad] = useState(true);
    useEffect(() => {
        fechData1();

        fechData2();

        fechData();
    }, [])

    const render = ({ item, index }) => {
        return (
            <TouchableOpacity style={{ flex: 1, width: 120, height: 133, marginLeft: 20 }}>
                <Image
                    style={{ width: 120, height: 133 }}
                    source={{ uri: `https://image.tmdb.org/t/p/w500${dataCast[index].profile_path}` }}>
                </Image>
                <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'black', marginLeft: 7, marginTop: 20 }}>{dataCast[index].name}</Text>
                <Text style={{ fontSize: 14, fontWeight: '200', marginLeft: 7 }}>{dataCast[index].character}</Text>
            </TouchableOpacity>
        )
    }

    const fechData1 = async () => {
        try {
            const dataArr = [];
            const response = await fetch('https://api.themoviedb.org/3/movie/297762/casts?api_key=e9e9d8da18ae29fc430845952232787c');
            const json = await response.json();
            for (let index = 0; index < 15; index++) {
                dataArr.push(json.cast[index])
            }
            setDataCast(dataArr);
            console.log(dataCast);
        } catch (error) {
            console.error(error);
        } finally {
            setLoad(false);
        }
    };

    const fechData = async () => {
        try {
            const response = await fetch('https://api.themoviedb.org/3/movie/297762?api_key=e9e9d8da18ae29fc430845952232787c&append_to_response=videos');
            const json = await response.json();
            console.log(json);
            setData(json);
            console.log(dataFilm);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };
    const fechData2 = async () => {
        try {
            const response = await fetch('https://api.themoviedb.org/3/movie/297762/reviews?api_key=e9e9d8da18ae29fc430845952232787c');
            const json = await response.json();
            console.log(json.results);
            setDataReview(json.results);
            console.log(dataReview);
        } catch (error) {
            console.error(error);
        } finally {
            setLoadReview(false);
        }
    };


    return (
        <View style={styles.container}>
            {isLoading && isLoad && isLoadReview ? (
                <ActivityIndicator />
            ) : (
                <ScrollView style={{ flex: 1 }}>
                    <View style={{ backgroundColor: 'black', flex: 3 }}>
                        <View style={{ flex: 4, backgroundColor: 'black' }}>
                            <Text>{dataFilm.overview}</Text>
                            <SafeAreaView>
                                <ImageBackground style={styles.image}
                                    source={{ uri: `https://image.tmdb.org/t/p/original${dataFilm.backdrop_path}` }}>
                                    <Image style={{ width: 90, height: 135.68, marginLeft: 20, marginTop: 20 }} source={{ uri: `https://image.tmdb.org/t/p/original${dataFilm.poster_path}` }}></Image>
                                </ImageBackground>
                            </SafeAreaView>
                        </View>
                        <View style={{ flex: 1, backgroundColor: 'black', flex: 1, justifyContent: 'center', marginTop: 50, flexDirection: 'row' }}>
                            <Text style={{ fontSize: 22, color: 'white' }}>{dataFilm.original_title}</Text>
                            <Text style={{ fontSize: 19, color: 'white', marginLeft: 7, marginTop: 5, fontWeight: 200 }}>({dataFilm.release_date.slice(0, 4)})</Text>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', marginTop: 15, justifyContent: 'space-between' }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginLeft: 30 }}>
                                <Image style={{ width: 44, height: 44 }} source={require('../assets/071Screenshot 2023-11- 225628 1.png')}></Image>
                                <Text style={{ color: 'white', fontSize: 16, marginTop: 9, marginLeft: 5 }}>User Core</Text>
                            </View>
                            <View style={{ borderWidth: 1, height: 24, marginLeft: 10, marginTop: 10, backgroundColor: 'white', justifyContent: 'center', width: 1 }}></View>
                            <View>
                                <Pressable
                                    onPress={() => {
                                        playerRef.current?.getCurrentTime().then(
                                            currentTime => console.log({ currentTime })
                                        );

                                        playerRef.current?.getDuration().then(
                                            getDuration => console.log({ getDuration })
                                        );
                                    }}
                                    style={{ flex: 1, flexDirection: 'row', marginTop: 10, marginRight: 30, justifyContent: 'flex-end' }}>
                                    <Image style={{ width: 16, marginTop: 5, height: 16 }} source={require('../assets/play-button 1.png')}></Image>
                                    <Text style={{ color: 'white', fontSize: 16 }}>Play Trailer</Text>
                                </Pressable>
                            </View>

                        </View>
                        <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}>
                            <View style={{ alignItems: 'center', marginBottom: 20 }}>
                                <Image style={{ width: 28, height: 20 }} source={require('../assets/Rectangle 10.png')}></Image>
                                <Text style={{ color: 'white', fontSize: 16 }}>{dataFilm.release_date}(US)</Text>
                                <Text style={{ color: 'white', fontSize: 16 }}>{dataFilm.genres[0].name}, {dataFilm.genres[1].name}, {dataFilm.genres[2].name}</Text>
                            </View>
                        </View>
                        <Text style={{ fontSize: 17, fontWeight: 200, color: 'white', marginLeft: 20 }}>Breaking out</Text>
                        <Text style={{ fontSize: 20, color: 'white', marginLeft: 20, marginTop: 15, marginBottom: 15 }}>Overview</Text>
                        <Text style={{ fontSize: 15, color: 'white', marginLeft: 20, marginBottom: 20 }}>{dataFilm.overview}</Text>
                    </View>
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <View>
                            <Text style={{ fontSize: 19, color: 'black', fontWeight: 'bold', marginTop: 20, marginLeft: 20 }}>Top Billeds Cast</Text>
                        </View>
                        <View style={{ flex: 1, width: 390, height: 350 }}>
                            <FlatList
                                data={dataCast}
                                renderItem={render}
                                horizontal
                                keyExtractor={item => `key-${item.id}`}
                            />
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={{ fontSize: 20, fontWeight: 300, color: 'black', marginLeft: 20, marginTop: 20 }}>Full Cast & Crew</Text>
                        </View>
                    </View>
                    <View style={{ flex: 1, borderWidth: 1 }}>
                        <View style={{ flex: 1, marginTop: 15, flexDirection: 'row',justifyContent :'space-between' }}>
                            <Text style={{ marginLeft: 10, fontSize: 19, fontWeight: 'bold' }}>Social</Text>
                            <View style={{flex: 1 , flexDirection :'row'}}>
                                <Text style={{ fontSize: 16, fontWeight: 700 }}>Discusstions({dataReview.length})</Text>
                                <Text style={{ fontSize: 16, fontWeight: 700 }}>Review</Text>
                            </View>
                        </View>
                        <Pressable style={{marginLeft : 20,borderRadius:5,flex : 1,borderWidth : 1 , width : 350 , height: 94}}>
                                    <View style={{}}>
                                        <Image style={{width : 32 , height:32 , borderRadius : 10}} source={{uri:`https://image.tmdb.org/t/p/w500/${dataReview[0].author_details.avatar_path}`}}></Image>
                                        <Text style={{fontSize : 20 , color:'black'}}>{dataReview[0].author}</Text>
                                    </View>
                        </Pressable>
                    </View>
                </ScrollView>


            )


            }
        </View>

    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }, image: {
        flex: 1,
        justifyContent: 'center',
        width: '390px',
        height: '175.68px'
    },
});
