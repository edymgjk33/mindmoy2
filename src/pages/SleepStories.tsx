import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Play, Pause, Moon, Star, ArrowLeft, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageTransition from '@/components/PageTransition';

interface SleepStory {
  id: string;
  title: string;
  narrator: string;
  duration: string;
  category: string;
  rating: number;
  description: string;
  isNew?: boolean;
  progress?: number;
}

const SleepStories = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const sleepStories: SleepStory[] = [
    {
      id: '1',
      title: 'Forest Rain',
      narrator: 'Sarah Mitchell',
      duration: '45 min',
      category: 'Nature',
      rating: 4.9,
      description: 'Gentle rain falling through ancient forest leaves, creating a peaceful soundscape for deep sleep.',
      isNew: true,
      progress: 25
    },
    {
      id: '2',
      title: 'The Lighthouse Keeper',
      narrator: 'David Chen',
      duration: '35 min',
      category: 'Adventure',
      rating: 4.8,
      description: 'A calming tale of a lighthouse keeper and the peaceful rhythm of ocean waves.',
      progress: 60
    },
    {
      id: '3',
      title: 'Mountain Meditation',
      narrator: 'Emma Thompson',
      duration: '30 min',
      category: 'Meditation',
      rating: 4.7,
      description: 'A guided journey through serene mountain landscapes with gentle breathing exercises.',
      progress: 0
    },
    {
      id: '4',
      title: 'Starlit Garden',
      narrator: 'Michael Rivers',
      duration: '40 min',
      category: 'Fantasy',
      rating: 4.8,
      description: 'Wander through a magical garden under the stars in this enchanting bedtime story.',
      progress: 80
    },
    {
      id: '5',
      title: 'Ocean Waves',
      narrator: 'Lisa Park',
      duration: '60 min',
      category: 'Nature',
      rating: 4.9,
      description: 'The rhythmic sound of gentle ocean waves lapping against a peaceful shore.',
      progress: 15
    }
  ];

  const categories = ['All', 'Nature', 'Adventure', 'Meditation', 'Fantasy'];

  const filteredStories = selectedCategory === 'All' 
    ? sleepStories 
    : sleepStories.filter(story => story.category === selectedCategory);

  const togglePlayback = (storyId: string) => {
    if (currentlyPlaying === storyId) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentlyPlaying(storyId);
      setIsPlaying(true);
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-green-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <PageTransition>
      <div 
        className="min-h-screen relative"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=1200&h=800&fit=crop')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        {/* Enhanced blurred overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/50 via-purple-900/40 to-blue-900/50 backdrop-blur-md"></div>
        
        <div className="relative z-10">
          {/* Header with enhanced styling */}
          <header className="bg-white/95 backdrop-blur-lg border-b border-white/20 shadow-xl">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                <div className="flex items-center space-x-4">
                  <Link to="/dashboard">
                    <Button variant="ghost" size="sm" className="text-gray-900 hover:bg-white/80">
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Back
                    </Button>
                  </Link>
                  <div className="flex items-center space-x-2">
                    <Moon className="w-6 h-6 text-indigo-600" />
                    <h1 className="text-xl font-semibold text-gray-900">Sleep Stories</h1>
                  </div>
                </div>
              </div>
            </div>
          </header>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Category Filters with enhanced styling */}
            <div className="mb-8">
              <h2 className="text-lg font-medium text-white mb-4 drop-shadow-lg">Categories</h2>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className={selectedCategory === category 
                      ? "bg-indigo-600 hover:bg-indigo-700 text-white shadow-md" 
                      : "bg-white/90 text-gray-900 border-white/50 hover:bg-white shadow-md"
                    }
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>

            {/* Currently Playing with enhanced styling */}
            {currentlyPlaying && (
              <Card className="mb-8 bg-white/95 backdrop-blur-lg shadow-2xl border-0 ring-1 ring-white/20">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg">
                        <Moon className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {sleepStories.find(story => story.id === currentlyPlaying)?.title}
                        </h3>
                        <p className="text-gray-700">
                          {sleepStories.find(story => story.id === currentlyPlaying)?.narrator}
                        </p>
                        <div className="relative mt-2 w-64">
                          <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full transition-all duration-500 shadow-md"
                              style={{ width: `${sleepStories.find(story => story.id === currentlyPlaying)?.progress || 35}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button onClick={() => togglePlayback(currentlyPlaying)} className="bg-indigo-600 hover:bg-indigo-700 shadow-md">
                        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Sleep Stories Grid with enhanced styling */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredStories.map((story) => (
                <Card key={story.id} className="bg-white/95 backdrop-blur-lg shadow-xl hover:shadow-2xl transition-all duration-300 border-0 ring-1 ring-white/20 hover:scale-105">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <CardTitle className="text-lg text-gray-900">{story.title}</CardTitle>
                          {story.isNew && (
                            <Badge className="bg-green-100 text-green-800 border-green-300">New</Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-700 font-medium">Narrated by {story.narrator}</p>
                        <div className="flex items-center space-x-2 mt-2">
                          <Badge variant="outline" className="border-gray-300 text-gray-700">{story.category}</Badge>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <p className="text-gray-700 text-sm mb-4 font-medium">{story.description}</p>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4 text-gray-500" />
                          <span className="text-gray-700 font-medium">{story.duration}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          {renderStars(story.rating)}
                          <span className="text-gray-700 font-medium">({story.rating})</span>
                        </div>
                      </div>
                      
                      {story.progress && story.progress > 0 && (
                        <div>
                          <div className="flex justify-between text-xs text-gray-600 mb-1">
                            <span className="font-medium">Progress</span>
                            <span className="font-medium">{story.progress}%</span>
                          </div>
                          <div className="relative">
                            <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full transition-all duration-500 shadow-md"
                                style={{ width: `${story.progress}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      <Button
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white shadow-md"
                        onClick={() => togglePlayback(story.id)}
                      >
                        <Play className="w-4 h-4 mr-2" />
                        {story.progress && story.progress > 0 ? 'Continue' : 'Start'} Listening
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default SleepStories;