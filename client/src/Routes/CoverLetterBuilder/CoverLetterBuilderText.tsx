import {
  PDFViewer,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
  PDFDownloadLink,
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

function CoverLetterBuilderText({ CoverLetterData }: any) {
  const { firstName, lastName, email, phoneNumber, street, city, zipCode, textBody } =
    CoverLetterData;
// center the text in the middle of the page
  return (
    <div className='flex justify-center'>
      <PDFViewer style={{ width: '700px', height: '700px' }}>
        <Document>
          <Page size='A4' style={styles.page}>
            <View style={styles.section}>
              <Text style={styles.heading}>
                {firstName} {lastName}
              </Text>
              <Text style={styles.body}>{email}</Text>
              <Text style={styles.body}>{phoneNumber}</Text>
              <Text style={styles.body}>{street}</Text>
              <Text style={styles.body}>
                {zipCode} {city}
              </Text>
              <View style={{ marginTop: 10 }}>
                <Text style={styles.body}>
                  {textBody}
                </Text>
              </View>
              <Text style={styles.body}>Best regards,</Text>
              <Text style={styles.body}>
                {firstName} {lastName}
              </Text>
            </View>
          </Page>
        </Document>
      </PDFViewer>
    </div>
  );
}

export default CoverLetterBuilderText;
