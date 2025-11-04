import React, { useState } from 'react';
import { GoogleGenAI } from '@google/genai';
import { Lightbulb, X, CheckCircle } from './icons';

interface Question {
  id: string;
  question: string;
  placeholder: string;
  type?: 'text' | 'textarea';
}

interface SectionDrafterProps {
  sectionName: string;
  questions: Question[];
  onAccept: (generatedContent: any) => void;
  systemPrompt: string;
}

export default function SectionDrafter({
  sectionName,
  questions,
  onAccept,
  systemPrompt
}: SectionDrafterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<'questions' | 'generating' | 'review'>('questions');
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [generatedContent, setGeneratedContent] = useState('');
  const [editedContent, setEditedContent] = useState('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [error, setError] = useState('');

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const canProceed = answers[currentQuestion?.id]?.trim().length > 0;

  const handleOpen = () => {
    setIsOpen(true);
    setStep('questions');
    setAnswers({});
    setCurrentQuestionIndex(0);
    setGeneratedContent('');
    setEditedContent('');
    setError('');
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const handleNext = () => {
    console.log('handleNext called', { isLastQuestion, currentQuestionIndex, totalQuestions: questions.length });
    if (isLastQuestion) {
      console.log('Calling generateContent');
      generateContent();
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const generateContent = async () => {
    console.log('generateContent started');
    setStep('generating');
    setError('');

    try {
      console.log('Initializing AI with API key:', process.env.API_KEY ? 'Present' : 'Missing');
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

      // Build the prompt with all answers
      const answersText = questions
        .map(q => `${q.question}\n${answers[q.id] || 'Not answered'}`)
        .join('\n\n');

      const prompt = `${systemPrompt}

USER'S ANSWERS:
${answersText}

Generate comprehensive, professional content for the ${sectionName} section based on these answers. Format the output as JSON that matches the expected data structure.`;

      console.log('Calling Gemini AI...');
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      console.log('AI Response received');
      const content = response.text;
      console.log('Generated content length:', content.length);
      setGeneratedContent(content);
      setEditedContent(content);
      setStep('review');
    } catch (err) {
      console.error('AI Error Details:', err);
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(`Failed to generate content: ${errorMessage}. Please try again.`);
      setStep('questions');
    }
  };

  const handleAccept = () => {
    try {
      // Try to parse as JSON first
      const parsedContent = JSON.parse(editedContent);
      onAccept(parsedContent);
      handleClose();
    } catch (err) {
      // If not valid JSON, pass as-is
      onAccept(editedContent);
      handleClose();
    }
  };

  const handleRegenerate = () => {
    generateContent();
  };

  if (!isOpen) {
    return (
      <button
        onClick={handleOpen}
        className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all shadow-md hover:shadow-lg"
      >
        <Lightbulb className="w-4 h-4" />
        <span>Draft with AI</span>
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-gradient-to-r from-purple-50 to-blue-50 rounded-t-2xl">
          <div className="flex items-center gap-3">
            <Lightbulb className="w-6 h-6 text-purple-600" />
            <div>
              <h3 className="font-bold text-gray-900">Draft {sectionName} with AI</h3>
              <p className="text-sm text-gray-600">
                {step === 'questions' && `Question ${currentQuestionIndex + 1} of ${questions.length}`}
                {step === 'generating' && 'Generating content...'}
                {step === 'review' && 'Review & Edit'}
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Progress Bar */}
        {step === 'questions' && (
          <div className="px-6 pt-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              {error}
            </div>
          )}

          {/* Questions Step */}
          {step === 'questions' && currentQuestion && (
            <div className="space-y-4">
              <label className="block text-lg font-semibold text-gray-900 mb-2">
                {currentQuestion.question}
              </label>
              {currentQuestion.type === 'textarea' ? (
                <textarea
                  value={answers[currentQuestion.id] || ''}
                  onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
                  placeholder={currentQuestion.placeholder}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 min-h-[150px] resize-y"
                  autoFocus
                />
              ) : (
                <input
                  type="text"
                  value={answers[currentQuestion.id] || ''}
                  onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
                  placeholder={currentQuestion.placeholder}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  autoFocus
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && canProceed) {
                      handleNext();
                    }
                  }}
                />
              )}
              <p className="text-sm text-gray-500">
                Be specific - better answers lead to better AI-generated content!
              </p>
            </div>
          )}

          {/* Generating Step */}
          {step === 'generating' && (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mb-4"></div>
              <p className="text-lg font-medium text-gray-700">Generating your content...</p>
              <p className="text-sm text-gray-500 mt-2">This may take 10-30 seconds</p>
            </div>
          )}

          {/* Review Step */}
          {step === 'review' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold text-gray-900">Generated Content</h4>
                <button
                  onClick={handleRegenerate}
                  className="text-sm text-purple-600 hover:text-purple-700 flex items-center gap-1"
                >
                  <span>🔄 Regenerate</span>
                </button>
              </div>
              <textarea
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 min-h-[300px] font-mono text-sm"
              />
              <p className="text-sm text-gray-500">
                Review and edit the generated content above. You can modify it before accepting.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 flex justify-between items-center bg-gray-50 rounded-b-2xl">
          {step === 'questions' && (
            <>
              <button
                onClick={handleBack}
                disabled={currentQuestionIndex === 0}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                ← Back
              </button>
              <div className="flex gap-2">
                <button
                  onClick={handleClose}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleNext}
                  disabled={!canProceed}
                  className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                >
                  <span>{isLastQuestion ? 'Generate' : 'Next'}</span>
                  {isLastQuestion ? <Lightbulb className="w-4 h-4" /> : <span>→</span>}
                </button>
              </div>
            </>
          )}

          {step === 'review' && (
            <>
              <button
                onClick={() => setStep('questions')}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                ← Back to Questions
              </button>
              <div className="flex gap-2">
                <button
                  onClick={handleClose}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAccept}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>Accept & Apply</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
