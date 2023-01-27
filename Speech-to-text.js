
import React, { useState, useRef, useMemo, useEffect } from 'react';

let mic;
if (navigator.userAgent.indexOf('Chrome') > -1) {
  // console.log('Chrome');

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const SpeechGrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList;
  const SpeechRecognitionEvent =
    window.SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent;

  mic = new SpeechRecognition();

  mic.continuous = true;
  mic.interimResults = true;
  mic.lang = 'en-IN';
}

const ReportEditor = props => {
  const initialeditor = useRef(null);
  // const [reportStatus, setReportStatus] = useState('draft');
  const [savedStatus, setSavedStatus] = useState('');
  const [content, setContent] = useState('');
  const [reportID, setReportID] = useState('');
  const [studyID, setStudyID] = useState('');
  const [taskID, setTaskID] = useState('');
  const [templateList, setTemplateList] = useState([]);
  const [templateId, setTemplateId] = useState('');
  const [templateName, setTemplateName] = useState('');
  const [reportArray, setReportCount] = useState([]);
  const [fetchedReportContent, setFetchedReportContent] = useState();
  // let [templateListArray, setTemplateListArray] = useState();
  //const [audioReport, setAudioReport] = useState(setAudioReport);
  const [isAudioReport, setIsAudioReport] = useState(false);

  const [RecordDialog, setRecordDialog] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [note, setNote] = useState(null);
  const [isChrome, setIsChrome] = useState(true);
  // const [savedNotes, setSavedNotes] = useState([]);

  useEffect(() => {
    handleListen();
  }, [isListening]);

  // const transcript = useMemo(() => {
  //   if (note) {
  //     return note.transcript;
  //   }
  // });

  const handleListen = () => {
    if (isListening) {
      mic.start();
      mic.onend = () => {
        // console.log('continue..');
        mic.start();
      };
    } else {
      mic.stop();
      mic.onend = () => {
        console.log('Stopped Mic on Click');
        setContent(content + ' ' + note);
      };
    }
    mic.onstart = () => {
      console.log(transcript);
    };

    mic.onresult = event => {
      const transcript = Array.from(event.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('');

      setNote(transcript);

      mic.onerror = event => {
        console.log(event.error);
      };
    };
  } 

    const transcript = useMemo(() => {
    if (note) {
      return note.transcript;
    }
  });

  return (
        <>
          <h1>Voice Notes</h1>
          <div className="container">
            <div className="box">
              <h2>Current Note</h2>
              {isListening ? <span>🎙️</span> : <span>🛑🎙️</span>}
              {/* <button>
                Save Note
              </button> */}
              <button onClick={() => setIsListening(prevState => !prevState)}>
                Start/Stop
              </button>
              <p>{note}</p>
            </div>
            <div className="box">
              <h2>Notes</h2>
              {/* {savedNotes.map(n => (
                <p key={n}>{n}</p>
              ))} */}
            </div>
          </div>
        </>
      )






};
  
  // return (
  //   <p> Hello </p>
  // )

  export default ReportEditor;