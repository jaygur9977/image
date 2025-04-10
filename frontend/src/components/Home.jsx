import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AiOutlineLoading3Quarters, AiOutlineDelete, AiOutlineDownload, AiOutlineQuestionCircle } from 'react-icons/ai';
import { FiUpload, FiImage } from 'react-icons/fi';
import { v4 as uuidv4 } from 'uuid';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

const Home = () => {
  const [user, setUser] = useState(null);
  const [previewFiles, setPreviewFiles] = useState([]);
  const [uploadStatus, setUploadStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [extractedTexts, setExtractedTexts] = useState({});
  const [generatedAnswers, setGeneratedAnswers] = useState({});
  const [purpose, setPurpose] = useState('');
  const [answerType, setAnswerType] = useState('');
  const [projectDetails, setProjectDetails] = useState({ paragraphs: 3, words: 300 });
  const [activeTab, setActiveTab] = useState('upload');
  const [isDragging, setIsDragging] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  // File handling functions
  const handleFileChange = (event) => {
    const files = event.target.files;
    processFiles(files);
  };

  const processFiles = (files) => {
    if (files && files.length > 0) {
      const newPreviewFiles = Array.from(files).map(file => ({
        id: uuidv4(),
        name: file.name,
        url: URL.createObjectURL(file),
        uploaded: false,
        type: file.type.startsWith('image/') ? 'image' : 'document'
      }));
      setPreviewFiles(prev => [...prev, ...newPreviewFiles]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    processFiles(files);
  };

  const handleDeletePhoto = (id) => {
    setPreviewFiles(prev => prev.filter(file => file.id !== id));
  };

  const handleUpload = async () => {
    if (previewFiles.length === 0) {
      setUploadStatus('Please add files first');
      return;
    }

    setLoading(true);
    setUploadStatus('Uploading...');
    const formData = new FormData();
    const files = document.querySelector('input[type="file"]').files;

    Array.from(files).forEach(file => formData.append('files', file));
    if (user) formData.append('userId', user.sub);

    try {
      const response = await axios.post('https://image-backed.onrender.com/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      
      setUploadStatus('Files uploaded successfully!');
      setPreviewFiles(prev => prev.map(file => ({ ...file, uploaded: true })));
      
      const texts = {};
      response.data.savedFiles.forEach(file => {
        texts[file.originalName] = file.extractedText;
      });
      setExtractedTexts(texts);
      setActiveTab('questions');
    } catch (error) {
      console.error(error);
      setUploadStatus('Upload failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (fileName, text) => {
    const questionInput = document.querySelector(`textarea[name="question-${fileName}"]`);
    const userQuestion = questionInput.value;
    if (!userQuestion.trim()) {
      questionInput.focus();
      setUploadStatus('Please enter a question');
      setTimeout(() => setUploadStatus(''), 3000);
      return;
    }

    try {
      const response = await axios.post('https://image-backed.onrender.com/api/ask', {
        text,
        question: userQuestion,
        purpose,
        answerType,
        projectDetails,
      });

      setGeneratedAnswers(prev => ({
        ...prev,
        [fileName]: response.data.answer,
      }));
    } catch (error) {
      console.error('Error submitting question:', error);
      setUploadStatus('Failed to get answer from AI');
      setTimeout(() => setUploadStatus(''), 3000);
    }
  };

  const downloadPdf = () => {
    const doc = new jsPDF();
    
    // Add title
    doc.setFontSize(20);
    doc.setTextColor(40);
    doc.setFont('helvetica', 'bold');
    doc.text('AI-Powered Document Analysis Report', 105, 20, { align: 'center' });
    
    // Add metadata
    doc.setFontSize(12);
    doc.setTextColor(100);
    doc.setFont('helvetica', 'normal');
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 105, 30, { align: 'center' });
    
    // Add content
    let yOffset = 40;
    
    Object.entries(extractedTexts).forEach(([fileName, text], index) => {
      const question = document.querySelector(`textarea[name="question-${fileName}"]`).value;
      const answer = generatedAnswers[fileName] || '';
      
      // Add question
      doc.setFontSize(14);
      doc.setTextColor(40);
      doc.setFont('helvetica', 'bold');
      const splitQuestion = doc.splitTextToSize(`Q${index + 1}: ${question}`, 180);
      doc.text(splitQuestion, 15, yOffset);
      yOffset += splitQuestion.length * 7;
      
      // Add answer
      doc.setFontSize(12);
      doc.setTextColor(80);
      doc.setFont('helvetica', 'normal');
      const splitAnswer = doc.splitTextToSize(answer, 180);
      doc.text(splitAnswer, 15, yOffset);
      yOffset += splitAnswer.length * 7 + 10;
      
      // Add divider if not last item
      if (index < Object.entries(extractedTexts).length - 1) {
        doc.setDrawColor(200);
        doc.line(15, yOffset, 195, yOffset);
        yOffset += 15;
      }
      
      // Add new page if needed
      if (yOffset > 270) {
        doc.addPage();
        yOffset = 20;
      }
    });

    doc.save('AI_Answers_Report.pdf');
  };

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth < 768;

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-start relative overflow-hidden pt-4 pb-8 px-4">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full opacity-10 animate-float"></div>
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-gradient-to-r from-green-400 to-teal-500 rounded-full opacity-10 animate-float-reverse"></div>
        <div className="absolute top-1/4 right-10 w-64 h-64 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full opacity-10 animate-pulse"></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl">
        {/* Header */}
        <header className="flex flex-col items-center text-center mb-8">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 animate-text-glow mb-2">
            AI Document Analyzer
          </h1>
          <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto animate-fade-in">
            Extract text from images and get AI-powered insights
          </p>
        </header>

        {/* Help button */}
        <button 
          onClick={() => setShowHelp(!showHelp)}
          className="fixed bottom-6 right-6 bg-blue-600 text-white p-3 rounded-full shadow-lg z-50 hover:bg-blue-700 transition-all"
          aria-label="Help"
        >
          <AiOutlineQuestionCircle size={24} />
        </button>

        {showHelp && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 rounded-lg max-w-2xl w-full p-6 relative">
              <button 
                onClick={() => setShowHelp(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white"
              >
                ✕
              </button>
              <h2 className="text-2xl font-bold text-white mb-4">How to use</h2>
              <div className="space-y-4 text-gray-300">
                <p>1. Select your files (images or documents)</p>
                <p>2. Upload them to our secure server</p>
                <p>3. Ask questions about the extracted text</p>
                <p>4. Get AI-powered answers instantly</p>
                <p>5. Download your report as PDF</p>
              </div>
            </div>
          </div>
        )}

        <div className="flex border-b border-gray-700 mb-8">
          <button
            onClick={() => setActiveTab('upload')}
            className={`px-6 py-3 font-medium text-lg ${activeTab === 'upload' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400 hover:text-gray-300'}`}
          >
            Upload
          </button>
          {Object.keys(extractedTexts).length > 0 && (
            <button
              onClick={() => setActiveTab('questions')}
              className={`px-6 py-3 font-medium text-lg ${activeTab === 'questions' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400 hover:text-gray-300'}`}
            >
              Questions
            </button>
          )}
        </div>

        {activeTab === 'upload' && (
          <div className="space-y-8">
            <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
              <h2 className="text-2xl font-semibold text-gray-300 mb-4">What is your purpose?</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { value: 'education', label: 'Education', color: 'from-blue-600 to-purple-600' },
                  { value: 'finance', label: 'Finance', color: 'from-green-600 to-teal-600' },
                  { value: 'health', label: 'Health', color: 'from-red-600 to-pink-600' }
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setPurpose(option.value)}
                    className={`p-4 rounded-lg transition-all duration-300 flex flex-col items-center ${
                      purpose === option.value
                        ? `bg-gradient-to-r ${option.color} text-white ring-2 ring-white`
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    <span className="text-xl font-semibold">{option.label}</span>
                  </button>
                ))}
              </div>
            </div>
          
           

            {purpose === 'education' && (
              <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
                <h2 className="text-2xl font-semibold text-gray-300 mb-4">What type of answer do you need?</h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[
                    { value: 'short', label: 'Short' },
                    { value: 'one-word', label: 'One Word' },
                    { value: 'long', label: 'Detailed' },
                    { value: 'project', label: 'Project' }
                  ].map((type) => (
                    <button
                      key={type.value}
                      onClick={() => setAnswerType(type.value)}
                      className={`p-3 rounded-lg transition-all ${
                        answerType === type.value
                          ? 'bg-gradient-to-r from-green-600 to-teal-600 text-white'
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                    >
                      {type.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {answerType === 'project' && (
              <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
                <h2 className="text-2xl font-semibold text-gray-300 mb-4">Project Requirements</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-gray-400">Number of Paragraphs</label>
                    <div className="flex items-center">
                      <button 
                        onClick={() => setProjectDetails(prev => ({ ...prev, paragraphs: Math.max(1, prev.paragraphs - 1) }  ))}
                        className="bg-gray-700 text-white px-4 py-2 rounded-l-lg hover:bg-gray-600"
                      >
                        -
                      </button>
                      <div className="bg-gray-700 text-white px-4 py-2 text-center w-full">
                        {projectDetails.paragraphs}
                      </div>
                      <button 
                        onClick={() => setProjectDetails(prev => ({ ...prev, paragraphs: prev.paragraphs + 1 }))}
                        className="bg-gray-700 text-white px-4 py-2 rounded-r-lg hover:bg-gray-600"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-gray-400">Word Count</label>
                    <input
                      type="range"
                      min="50"
                      max="1000"
                      step="50"
                      value={projectDetails.words}
                      onChange={(e) => setProjectDetails(prev => ({ ...prev, words: parseInt(e.target.value) }))}
                      className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="text-center text-gray-300">{projectDetails.words} words</div>
                  </div>
                </div>
              </div>
            )}

            <div 
              className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all ${isDragging ? 'border-blue-500 bg-blue-900 bg-opacity-20' : 'border-gray-700'}`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <div className="flex flex-col items-center justify-center space-y-4">
                <FiUpload className="text-4xl text-blue-500" />
                <h3 className="text-xl font-semibold text-gray-300">
                  {isDragging ? 'Drop your files here' : 'Drag & drop files here'}
                </h3>
                <p className="text-gray-400">or</p>
                <label className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg cursor-pointer hover:from-blue-700 hover:to-purple-700 transition-all">
                  <span className="mr-2">Browse Files</span>
                  <input
                    type="file"
                    className="hidden"
                    multiple
                    onChange={handleFileChange}
                    accept="image/*,.pdf,.doc,.docx"
                  />
                </label>
                <p className="text-sm text-gray-500 mt-2">
                  Supported formats: JPG, PNG, PDF, DOCX (max 10MB each)
                </p>
              </div>
            </div>

            {previewFiles.length > 0 && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-gray-300">
                    Selected Files ({previewFiles.length})
                  </h2>
                  <button
                    onClick={handleUpload}
                    disabled={loading || previewFiles.every(f => f.uploaded)}
                    className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 ${
                      loading || previewFiles.every(f => f.uploaded)
                        ? 'bg-gray-600 cursor-not-allowed'
                        : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white'
                    }`}
                  >
                    {loading ? (
                      <>
                        <AiOutlineLoading3Quarters className="animate-spin" />
                        Uploading...
                      </>
                    ) : previewFiles.every(f => f.uploaded) ? (
                      'All Uploaded'
                    ) : (
                      <>
                        <FiUpload />
                        Upload All
                      </>
                    )}
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {previewFiles.map((file) => (
                    <div key={file.id} className="relative group">
                      <div className={`aspect-square rounded-lg overflow-hidden ${file.uploaded ? 'opacity-70' : ''}`}>
                        {file.type === 'image' ? (
                          <img
                            src={file.url}
                            alt={file.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                            <FiImage className="text-4xl text-gray-500" />
                          </div>
                        )}
                      </div>
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all flex items-center justify-center">
                        <button
                          onClick={() => handleDeletePhoto(file.id)}
                          className="opacity-0 group-hover:opacity-100 bg-red-600 p-2 rounded-full hover:bg-red-700 transition-all"
                        >
                          <AiOutlineDelete className="text-white" />
                        </button>
                      </div>
                      <div className="mt-2 text-sm text-gray-400 truncate">
                        {file.name}
                      </div>
                      {file.uploaded && (
                        <div className="absolute top-2 left-2 bg-green-600 text-white text-xs px-2 py-1 rounded">
                          Uploaded
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Questions tab */}
        {activeTab === 'questions' && (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-gray-300">Ask About Your Documents</h2>
              {Object.keys(generatedAnswers).length > 0 && (
                <button
                  onClick={downloadPdf}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-600 to-orange-600 text-white rounded-lg hover:from-yellow-700 hover:to-orange-700 transition-all"
                >
                  <AiOutlineDownload />
                  Download Report
                </button>
              )}
            </div>

            {Object.entries(extractedTexts).map(([fileName, text]) => (
              <div key={fileName} className="bg-gray-800 rounded-xl p-6 shadow-lg">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold text-gray-300 truncate max-w-xs">
                    {fileName}
                  </h3>
                  <span className="text-xs bg-gray-700 text-gray-400 px-2 py-1 rounded">
                    {text.length > 500 ? 'Large document' : 'Small document'}
                  </span>
                </div>

                <div className="bg-gray-700 p-4 rounded-lg mb-4 max-h-60 overflow-y-auto">
                  <pre className="text-gray-300 whitespace-pre-wrap text-sm">{text}</pre>
                </div>

                <div className="space-y-4">
                  <textarea
                    className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    name={`question-${fileName}`}
                    placeholder={`Ask your question about ${fileName}...`}
                    rows={isMobile ? 3 : 4}
                  />
                  <div className="flex justify-between">
                    <button
                      onClick={() => handleSubmit(fileName, text)}
                      className="px-6 py-2 bg-gradient-to-r from-green-600 to-teal-600 text-white font-semibold rounded-lg hover:from-green-700 hover:to-teal-700 transition-all"
                    >
                      Get Answer
                    </button>
                    <button 
                      onClick={() => {
                        const textarea = document.querySelector(`textarea[name="question-${fileName}"]`);
                        textarea.value = `Can you summarize the key points from this ${purpose} document?`;
                      }}
                      className="text-gray-400 hover:text-gray-300 text-sm"
                    >
                      Suggest question
                    </button>
                  </div>
                </div>

                {generatedAnswers[fileName] && (
                  <div className="mt-6 bg-gray-700 p-4 rounded-lg border border-gray-600 animate-fade-in">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                      <h4 className="text-lg font-semibold text-gray-300">AI Response:</h4>
                    </div>
                    <div className="text-gray-200 whitespace-pre-wrap">
                      {generatedAnswers[fileName]}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Status message */}
        {uploadStatus && (
          <div className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-lg shadow-lg ${
            uploadStatus.includes('success') 
              ? 'bg-green-600 text-white' 
              : uploadStatus.includes('Uploading') 
                ? 'bg-blue-600 text-white'
                : 'bg-red-600 text-white'
          }`}>
            {uploadStatus}
          </div>
        )}
      </div>

      <footer className="mt-12 text-center text-gray-600 text-sm">
        © {new Date().getFullYear()} AI Document Analyzer | Secure and Private Processing
      </footer>
    </div>
  );
};

export default Home;
