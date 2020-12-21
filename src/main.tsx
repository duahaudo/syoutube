import React, { useRef, useState } from 'react';
import {
  Platform, StyleSheet, Text, View, TextInput, Button, Alert, ActivityIndicator,
  ScrollView, Pressable, Animated
} from 'react-native';
import Youtube from "./video"

import useSearch from "./hooks/useSearch"
import { useEffect } from 'react';

export default function App() {

  const inputRef = useRef(null)

  const [filter, setFilter] = useState("")
  const [video, setVideo] = useState<any | null>(null)
  const [queryFilter, setQueryFilter] = useState("")
  const [loading, fetchedData] = useSearch(queryFilter)

  const [options, setOptions] = useState([])

  useEffect(() => {
    console.log(fetchedData)

    if (loading) {
      setOptions([])
    } else {
      // @ts-ignore
      if (!!fetchedData && !!fetchedData.success && !!queryFilter) {
        // @ts-ignore
        const newFilterItems = fetchedData.data.items.map((item: any) => {
          return {
            videoId: item.id.videoId,
            title: item.snippet.title,
            description: item.snippet.description,
            snippet: item.snippet
          }
        })
        setOptions(newFilterItems)
      }
    }
  }, [loading, fetchedData])

  return (
    <View style={styles.container}>
      {!video && <View style={styles.filterView}>
        <TextInput
          ref={inputRef}
          style={styles.input}
          placeholder="Enter your text"
          value={filter}
          onChangeText={(text) => {
            setVideo(null)
            setOptions([])
            setFilter(text)
          }} />
        <View style={styles.buttonWrapper}>
          <View style={styles.button}>
            <Button
              color={!!loading ? '#aaa' : '#fff'}
              title="Search"
              onPress={() => {
                setQueryFilter(filter)
                // @ts-ignore
                inputRef.current.blur()
              }}
            />
            <ActivityIndicator size="small" animating={!!loading} />
          </View>
        </View>

      </View>}

      {!video && (options.length === 0) && <View style={styles.noResultWrapper}>
        <View>
          <Text style={styles.noResultText}>No result found.</Text>
        </View>
      </View>}

      {!video && (options.length > 0) && <ScrollView style={styles.optionItems}>
        {options.map((option: any, idx: number) => {
          return <Pressable key={idx} onPress={() => {
            setVideo(option);
            console.log(option.videoId)
          }}>
            <View style={styles.optionItem}>
              <Text style={styles.optionItemText}>{option.title}</Text>
              <Text style={styles.optionDescription}>{option.description}</Text>
            </View>
          </Pressable>
        })}
      </ScrollView>}

      {!!video && <Youtube video={video} clearVideoId={() => {
        setVideo(null)
      }} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'space-between',
    marginTop: (Platform.OS == 'ios') ? 20 : 0,
    padding: 10,
    // backgroundColor: 'red'
  },
  filterView: {
    // backgroundColor: 'yellow',
    marginBottom: 10,
    flexGrow: 0
  },
  input: {
    height: 40,
    padding: 10,
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 5
  },
  buttonWrapper: {
    backgroundColor: '#2554C7',
    borderRadius: 5,
    marginTop: 10
  },
  button: {
    paddingTop: 3,
    paddingBottom: 3,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  noResultWrapper: {
    // backgroundColor: 'yellow',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  noResultText: {
    color: '#aaa',
    fontSize: 20,
    fontWeight: "bold"
  },
  optionItems: {
    // backgroundColor: 'red',
    flex: 1
  },
  optionItem: {
    // backgroundColor: 'red',
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1
  },
  optionItemText: {

  },
  optionDescription: {
    marginTop: 10,
    fontSize: 12,
    color: '#aaa'
  }
});
