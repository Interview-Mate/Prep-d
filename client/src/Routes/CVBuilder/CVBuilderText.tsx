import {
  PDFViewer,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
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

function CVBuilderText({ CVData }: any) {
  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    street,
    city,
    zipCode,
    workExperience,
    keywords,
  } = CVData;

  return (
    <div>
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
            </View>
            <View style={styles.section}>
              <Text style={styles.subheading}>Dear ...</Text>
              <View>
                <Text style={styles.subheading}>ChatGPT placeholder</Text>
              </View>
            </View>
          </Page>
        </Document>
      </PDFViewer>
      {/* <PDFDownloadLink document={<Document><Page size="A4" style={styles.page}><View style={styles.section}><Text style={styles.heading}>{firstName} {lastName}</Text><Text style={styles.body}>{email}</Text><Text style={styles.body}>{phoneNumber}</Text></View><View style={styles.section}><Text style={styles.subheading}>Work Experience</Text>{workExperience.map((job) => (<View key={job.id} style={{ marginBottom: 10 }}><Text style={styles.subheading}>{job.jobTitle}</Text><Text style={styles.body}>{job.company}, {job.startDate} - {job.endDate}</Text><Text style={styles.body}>{job.description}</Text><Text style={styles.body}>Keywords: {job.keywords.join(', ')}</Text></View>))}</View></Page></Document>} fileName={`${firstName}_${lastName}_CV.pdf`}>
        {({ blob, url, loading, error }) => (loading ? 'Generating PDF...' : <button>Download PDF</button>)}
      </PDFDownloadLink> */}
    </div>
  );
}

export default CVBuilderText;
