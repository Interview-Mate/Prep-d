import {
  PDFViewer,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,

} from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 30,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subheading: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  body: {
    fontSize: 12,
    marginBottom: 5,
  },
});

Font.register({
  family: 'Oswald',
  src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf',
});

function CoverLetterReviewerText({ CoverLetterData }: any) {

  return (
    <div className='flex justify-center'>
      <PDFViewer style={{ width: '700px', height: '700px' }}>
        <Document>
          <Page size='A4' style={styles.page}>
            <View style={styles.section}>
              <Text style={styles.body}>{CoverLetterData}</Text>
            </View>
          </Page>
        </Document>
      </PDFViewer>
    </div>
  );
}

export default CoverLetterReviewerText;
