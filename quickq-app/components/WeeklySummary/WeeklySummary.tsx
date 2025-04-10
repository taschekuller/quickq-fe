import { View, Text, StyleSheet, Dimensions } from 'react-native';
import PagerView from 'react-native-pager-view';
import { PieChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

const data = [
  { name: 'TYT Matematik', population: 27, color: '#F4F3DA', legendFontColor: 'white', legendFontSize: 12 },
  { name: 'AYT Matematik', population: 26, color: '#CCF1DF', legendFontColor: 'white', legendFontSize: 12 },
  { name: 'TYT Fizik', population: 24, color: '#B9AEEE', legendFontColor: 'white', legendFontSize: 12 },
  { name: 'TYT Kimya', population: 23, color: '#D9F87F', legendFontColor: 'white', legendFontSize: 12 },
];

export default function WeeklySummary() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}> 🙌 Haftalık Özetiniz</Text>
      <View style={styles.graphicsWrapper}>
        <PagerView style={styles.pager} initialPage={0}>
          <View key="1" style={styles.page}>
            <PieChart
              data={data}
              width={screenWidth - 40}
              height={220}
              accessor="population"
              backgroundColor="transparent"
              paddingLeft="15"
              absolute
              chartConfig={{
                color: () => `black`,
                labelColor: () => `black`,
              }}
            />
          </View>
          {/*
        <View key="2" style={styles.page}>
          <Text style={{ color: 'white' }}>2. Sayfa - Başka Özet</Text>
        </View> */}
        </PagerView>
      </View>
    </View >
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: 16,
  },
  graphicsWrapper: {
    borderWidth: 1,
    borderColor: "rgba(30, 30, 30, 0.35)",
    borderRadius: 12,
    boxShadow: "rgba(99, 99, 99, 0.1) 0px 2px 8px 0px"
  },
  title: {
    fontSize: 16,
    color: "white",
    marginBottom: 20,
  },
  pager: {
    height: 200,
  },
  page: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
