import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import VideoPlayer from '@/components/VideoPlayer';

type Video = {
  id: number;
  title: string;
  thumbnail: string;
  author: string;
  authorAvatar: string;
  views: string;
  duration: string;
  videoUrl: string;
  isSubscribed?: boolean;
};

type Author = {
  id: number;
  name: string;
  avatar: string;
  subscribers: string;
  isSubscribed: boolean;
};

const mockVideos: Video[] = [
  {
    id: 1,
    title: 'Создание современного веб-приложения с React',
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=450&fit=crop',
    author: 'Код Мастер',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=1',
    views: '125К',
    duration: '15:43',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  },
  {
    id: 2,
    title: 'Топ 10 трендов дизайна 2024',
    thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=450&fit=crop',
    author: 'Дизайн Про',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=2',
    views: '340К',
    duration: '22:15',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
  },
  {
    id: 3,
    title: 'Путешествие по Токио: скрытые места',
    thumbnail: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=450&fit=crop',
    author: 'Путешественник',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=3',
    views: '890К',
    duration: '18:30',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
  },
  {
    id: 4,
    title: 'Как заработать на фрилансе в 2024',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=450&fit=crop',
    author: 'Бизнес Гуру',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=4',
    views: '567К',
    duration: '25:12',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
  },
  {
    id: 5,
    title: 'Лучшие приемы фотографии для начинающих',
    thumbnail: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=800&h=450&fit=crop',
    author: 'Фото Эксперт',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=5',
    views: '234К',
    duration: '12:45',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
  },
  {
    id: 6,
    title: 'Тренировка дома: 30 минут без оборудования',
    thumbnail: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&h=450&fit=crop',
    author: 'Фитнес Тренер',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=6',
    views: '1.2М',
    duration: '30:00',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
  },
];

const mockAuthors: Author[] = [
  {
    id: 1,
    name: 'Код Мастер',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=1',
    subscribers: '450К',
    isSubscribed: true,
  },
  {
    id: 2,
    name: 'Дизайн Про',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=2',
    subscribers: '780К',
    isSubscribed: false,
  },
  {
    id: 3,
    name: 'Путешественник',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=3',
    subscribers: '2.1М',
    isSubscribed: true,
  },
  {
    id: 4,
    name: 'Бизнес Гуру',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=4',
    subscribers: '320К',
    isSubscribed: false,
  },
];

export default function Index() {
  const [activeTab, setActiveTab] = useState<'home' | 'catalog' | 'recommendations' | 'profile'>('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [authors, setAuthors] = useState<Author[]>(mockAuthors);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  const handleSubscribe = (authorId: number) => {
    setAuthors((prev) =>
      prev.map((author) =>
        author.id === authorId ? { ...author, isSubscribed: !author.isSubscribed } : author
      )
    );
  };

  const filteredVideos = searchQuery
    ? mockVideos.filter(
        (video) =>
          video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          video.author.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : mockVideos;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/80 border-b border-border/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                <Icon name="Play" size={32} className="text-primary" />
                <h1 className="text-2xl font-bold">VideoHub</h1>
              </div>
            </div>

            <div className="flex-1 max-w-2xl">
              <div className="relative">
                <Icon name="Search" size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Поиск видео..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-muted/50 border-border/50 focus:border-primary transition-all"
                />
              </div>
            </div>

            <Button size="icon" variant="ghost" className="hover:bg-primary/10">
              <Icon name="Bell" size={24} />
            </Button>
          </div>

          <nav className="flex items-center gap-2 mt-4">
            {[
              { key: 'home', label: 'Главная', icon: 'Home' },
              { key: 'catalog', label: 'Каталог', icon: 'LayoutGrid' },
              { key: 'recommendations', label: 'Рекомендации', icon: 'Sparkles' },
              { key: 'profile', label: 'Профиль', icon: 'User' },
            ].map((tab) => (
              <Button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as typeof activeTab)}
                variant={activeTab === tab.key ? 'default' : 'ghost'}
                className={`gap-2 ${
                  activeTab === tab.key
                    ? 'bg-gradient-to-r from-primary to-secondary hover:opacity-90'
                    : 'hover:bg-muted'
                }`}
              >
                <Icon name={tab.icon as any} size={18} />
                {tab.label}
              </Button>
            ))}
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {activeTab === 'home' && (
          <div className="space-y-8 animate-fade-in">
            <section>
              <div className="relative h-96 rounded-3xl overflow-hidden mb-8 group">
                <img
                  src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1600&h=600&fit=crop"
                  alt="Hero"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                <div className="absolute bottom-8 left-8 right-8">
                  <Badge className="mb-3 bg-accent/90 text-accent-foreground">Трендовое</Badge>
                  <h2 className="text-4xl font-bold mb-3 text-white drop-shadow-lg">
                    Откройте мир видео
                  </h2>
                  <p className="text-lg text-white/90 mb-4 drop-shadow-md">
                    Смотрите, создавайте и делитесь контентом с миллионами пользователей
                  </p>
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-primary via-secondary to-accent hover:opacity-90 text-white shadow-lg"
                  >
                    <Icon name="Play" size={20} className="mr-2" />
                    Начать просмотр
                  </Button>
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Icon name="TrendingUp" size={28} className="text-primary" />
                Популярные видео
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredVideos.map((video, index) => (
                  <div
                    key={video.id}
                    className="group cursor-pointer animate-scale-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                    onClick={() => setSelectedVideo(video)}
                  >
                    <div className="relative rounded-2xl overflow-hidden mb-3 bg-card">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full aspect-video object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <Badge className="absolute bottom-3 right-3 bg-black/80 text-white">
                        {video.duration}
                      </Badge>
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center backdrop-blur-sm">
                          <Icon name="Play" size={28} className="text-primary ml-1" />
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Avatar className="w-10 h-10 ring-2 ring-primary/20">
                        <AvatarImage src={video.authorAvatar} />
                        <AvatarFallback>{video.author[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h4 className="font-semibold line-clamp-2 group-hover:text-primary transition-colors">
                          {video.title}
                        </h4>
                        <p className="text-sm text-muted-foreground mt-1">{video.author}</p>
                        <p className="text-sm text-muted-foreground">{video.views} просмотров</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {activeTab === 'catalog' && (
          <div className="animate-fade-in space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold flex items-center gap-2">
                <Icon name="LayoutGrid" size={32} className="text-secondary" />
                Каталог видео
              </h2>
              <div className="flex gap-2">
                {['Все', 'Обучение', 'Развлечения', 'Музыка', 'Путешествия'].map((category) => (
                  <Button key={category} variant="outline" className="hover:border-primary">
                    {category}
                  </Button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {filteredVideos.map((video, index) => (
                <div
                  key={video.id}
                  className="group cursor-pointer animate-slide-up"
                  style={{ animationDelay: `${index * 0.05}s` }}
                  onClick={() => setSelectedVideo(video)}
                >
                  <div className="relative rounded-xl overflow-hidden mb-3 bg-card shadow-lg hover:shadow-2xl transition-shadow">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full aspect-video object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <Badge className="absolute top-3 left-3 bg-gradient-to-r from-primary to-secondary">
                      HD
                    </Badge>
                    <Badge className="absolute bottom-3 right-3 bg-black/80 text-white">
                      {video.duration}
                    </Badge>
                  </div>
                  <h4 className="font-semibold line-clamp-2 mb-1 group-hover:text-secondary transition-colors">
                    {video.title}
                  </h4>
                  <p className="text-sm text-muted-foreground">{video.views} просмотров</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'recommendations' && (
          <div className="animate-fade-in space-y-8">
            <h2 className="text-3xl font-bold flex items-center gap-2">
              <Icon name="Sparkles" size={32} className="text-accent" />
              Рекомендации для вас
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredVideos.slice(0, 4).map((video, index) => (
                <div
                  key={video.id}
                  className="flex gap-4 p-4 rounded-2xl bg-card hover:bg-card/80 cursor-pointer group border border-border/50 hover:border-primary/50 transition-all animate-scale-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => setSelectedVideo(video)}
                >
                  <div className="relative w-48 flex-shrink-0 rounded-xl overflow-hidden">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <Badge className="absolute bottom-2 right-2 bg-black/80 text-white text-xs">
                      {video.duration}
                    </Badge>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-accent transition-colors">
                      {video.title}
                    </h3>
                    <div className="flex items-center gap-2 mb-2">
                      <Avatar className="w-6 h-6">
                        <AvatarImage src={video.authorAvatar} />
                        <AvatarFallback>{video.author[0]}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-muted-foreground">{video.author}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{video.views} просмотров</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="animate-fade-in space-y-8">
            <div className="relative h-48 rounded-3xl overflow-hidden bg-gradient-to-r from-primary via-secondary to-accent">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <Avatar className="w-24 h-24 mx-auto mb-4 ring-4 ring-white">
                    <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=user" />
                    <AvatarFallback>ВЫ</AvatarFallback>
                  </Avatar>
                  <h2 className="text-3xl font-bold text-white mb-2">Ваш Профиль</h2>
                  <p className="text-white/90">Управляйте подписками и контентом</p>
                </div>
              </div>
            </div>

            <section>
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Icon name="Users" size={28} className="text-primary" />
                Ваши подписки
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {authors.map((author, index) => (
                  <div
                    key={author.id}
                    className="p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/50 transition-all text-center animate-scale-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <Avatar className="w-20 h-20 mx-auto mb-4 ring-2 ring-primary/30">
                      <AvatarImage src={author.avatar} />
                      <AvatarFallback>{author.name[0]}</AvatarFallback>
                    </Avatar>
                    <h4 className="font-bold mb-1">{author.name}</h4>
                    <p className="text-sm text-muted-foreground mb-4">{author.subscribers} подписчиков</p>
                    <Button
                      onClick={() => handleSubscribe(author.id)}
                      variant={author.isSubscribed ? 'outline' : 'default'}
                      className={
                        author.isSubscribed
                          ? ''
                          : 'bg-gradient-to-r from-primary to-secondary hover:opacity-90'
                      }
                      size="sm"
                    >
                      <Icon name={author.isSubscribed ? 'Check' : 'Plus'} size={16} className="mr-1" />
                      {author.isSubscribed ? 'Подписаны' : 'Подписаться'}
                    </Button>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}
      </main>

      {selectedVideo && (
        <VideoPlayer
          videoUrl={selectedVideo.videoUrl}
          title={selectedVideo.title}
          author={selectedVideo.author}
          onClose={() => setSelectedVideo(null)}
        />
      )}
    </div>
  );
}