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

function CVBuilderText({ resumeData }: any) {
  const { firstName, lastName, email, phoneNumber, workExperience, keywords } =
    resumeData;

  return (
    <div className='flex flex-col items-center justify-center h-full w-4/5 bg-black'>
      <PDFViewer>
        <Document>
          <Page size='A4' style={styles.page}>
            <View style={styles.section}>
              <Text style={styles.heading}>
                {firstName} {lastName}
              </Text>
              <Text style={styles.body}>{email}</Text>
              <Text style={styles.body}>{phoneNumber}</Text>
            </View>
            <View style={styles.section}>
              <Text style={styles.subheading}>Work Experience</Text>
              {workExperience.map((job) => (
                <View key={job.id} style={{ marginBottom: 10 }}>
                  <Text style={styles.subheading}>{job.jobTitle}</Text>
                  <Text style={styles.body}>
                    {job.company}, {job.startDate} - {job.endDate}
                  </Text>
                  <Text style={styles.body}>{job.description}</Text>
                  <Text style={styles.body}>
                    Keywords: {job.keywords.join(', ')}
                  </Text>
                </View>
              ))}
            </View>
          </Page>
        </Document>
        {/* <PDFDownloadLink document={<Document><Page size="A4" style={styles.page}><View style={styles.section}><Text style={styles.heading}>{firstName} {lastName}</Text><Text style={styles.body}>{email}</Text><Text style={styles.body}>{phoneNumber}</Text></View><View style={styles.section}><Text style={styles.subheading}>Work Experience</Text>{workExperience.map((job) => (<View key={job.id} style={{ marginBottom: 10 }}><Text style={styles.subheading}>{job.jobTitle}</Text><Text style={styles.body}>{job.company}, {job.startDate} - {job.endDate}</Text><Text style={styles.body}>{job.description}</Text><Text style={styles.body}>Keywords: {job.keywords.join(', ')}</Text></View>))}</View></Page></Document>} fileName={`${firstName}_${lastName}_resume.pdf`}>
        {({ blob, url, loading, error }) => (loading ? 'Generating PDF...' : <button>Download PDF</button>)}
      </PDFDownloadLink> */}
      </PDFViewer>
    </div>
  );
}

export default CVBuilderText;
