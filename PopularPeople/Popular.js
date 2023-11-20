import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, Button, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useEffect, useState } from 'react';
import { ScrollView } from 'react-native-web';


const data1 = [
    { title: 'Popularity Descending', value: 1 },
    { title: 'Popularity Ascending', value: 2 },
    { title: 'Rating Descending', value: 3 },
    { title: 'Rating Ascending', value: 4 },
    { title: 'Title A-Z', value: 5 },
]



export default function App() {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [page, setPage] = useState(2);
    const [dataPage , setDataPage] = ([])
    useEffect(() => {
        fechData();
    }, [])

    const fechData = async () => {
        try {
            const response = await fetch('https://api.themoviedb.org/3/movie/297762/similar?api_key=e9e9d8da18ae29fc430845952232787c&language=en-US&page=' + page);
            const json = await response.json();
            console.log(json.results);
            setData(json.results);
            console.log(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };
    const render = () => {
        const myLoop = [];
        for (let index = 0; index < data.length; index++) {
            myLoop.push(
                <View style={styles.Image} key={index}>
                    <View>
                        <Image source={{ uri: `https://image.tmdb.org/t/p/w500${data[index].backdrop_path}` }}
                            style={{ width: 94, height: 141 }}
                        />
                    </View>

                    <View style={{ marginLeft: 15, marginTop: 25 }}>
                        <Text>{data[0].title}</Text>
                        <Text style={{ color: '#999999' }}>{data[index].release_date}</Text>
                        <Text style={{ marginTop: 20 }}>{data[index].overview}</Text>
                    </View>


                </View>
            )

        }
        return myLoop;
    }
    const [value, setValue] = useState(null);
    return (
        <View style={styles.container}>
            {isLoading ? (
                <ActivityIndicator />
            ) : (
                <ScrollView style={{ flex: 1, width: '100%' }}>
                    <View style={{ height: 64, backgroundColor: 'black', width: '100%' }}>

                    </View>
                    <View style={styles.footer}>
                        <View style={{ alignContent: 'flex-start', width: '390px' }}>
                            <Text style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: 10 }}>Popular TV Shows</Text>
                            <Dropdown style={{ borderWidth: .5, borderRadius: 5, width: '350px', shadowRadius: '5px', height: '50px', shadowColor: '#747272' }}
                                data={data1}
                                placeholderStyle={{ fontWeight: 'bold', fontSize: '16px', marginLeft: 10 }}
                                maxHeight={300}
                                labelField="title"
                                valueField="value"
                                placeholder="Sort...."
                                value={value}
                                onChange={item => {
                                    setValue(item.value);
                                }}
                            />
                        </View>
                        <View>
                            <View>
                                {render()}
                                <View>
                                    <Pressable
                                        onPress={() => {
                                            let pageIndex = page + 1;
                                            setPage(pageIndex);
                                            fechData();
                                            console.log(page);
                                        }}
                                        style={({ pressed }) => [
                                            {
                                                backgroundColor: pressed ? 'rgb(210, 230, 255)' : 'white',
                                            },
                                            { flex: 1, backgroundColor: 'blue', marginTop: 25, height: '70px', borderRadius: 5 },
                                        ]}>
                                        <Text style={{ fontSize: 24, textAlign: 'center', color: 'white' }}>Next Page</Text>



                                    </Pressable>
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            )}

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '390.400px',
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {

    },
    footer: {
        paddingRight: '20px',
        paddingLeft: '20px',
        paddingTop: '20px',
    },
    Image: {
        flex: 1,
        flexDirection: 'row',
        with: 94,
        height: 141,
        marginTop: '50px',
        borderRadius: '8px',
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    }
});
