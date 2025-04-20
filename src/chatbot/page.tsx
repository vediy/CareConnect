'use client';

import { useEffect, useState } from 'react';

export default function ChatPage({
  searchParams,
}: {
  searchParams: { causes?: string };
}) {
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(true);

  const selectedCauses = searchParams.causes || 'education, food insecurity';

  useEffect(() => {
    const sendPrompt = async () => {
      try {
        const result = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          },
          body: JSON.stringify({
            model: 'gpt-4o',
            messages: [
              {
                role: 'system',
                content:
                  'You are a helpful assistant that suggests relevant charities based on user preferences.',
              },
              {
                role: 'user',
                content: `I care about these causes: ${selectedCauses}`,
              },
            ],
          }),
        });

        const data = await result.json();

        if (data.error) {
          console.error('OpenAI API Error:', data.error);
          setResponse(`Error: ${data.error.message}`);
          return;
        }

        const message = data.choices?.[0]?.message?.content;
        setResponse(message || '❌ Unexpected response format from OpenAI.');
      } catch (error) {
        console.error('Fetch error:', error);
        setResponse('🚫 Failed to reach OpenAI.');
      } finally {
        setLoading(false);
      }
    };

    sendPrompt();
  }, [selectedCauses]);

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Charity Assistant</h1>
      {loading ? (
        <p className="text-gray-500">Thinking...</p>
      ) : (
        <div className="whitespace-pre-wrap">{response}</div>
      )}
    </div>
  );
}