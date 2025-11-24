import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipForward, SkipBack, Music, Instagram, Twitter, Mail, ArrowUpRight, Terminal, Activity, Disc, Globe, X } from 'lucide-react';

// 模拟音乐数据 - IDM/Industrial 风格通常曲名较长或带有编号
const TRACKS = [
  {
    id: "01",
    title: "如果时间倒转",
    album: "实验流行",
    duration: "01:50",
    cover: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=300&h=300&fit=crop",
    url: "https://github.com/IF-Zh/Music/raw/refs/heads/main/%E5%A6%82%E6%9E%9C%E6%97%B6%E9%97%B4%E5%80%92%E8%BD%AC.mp3" 
  },
  {
    id: "02",
    title: "无畏推理",
    album: "商业流行",
    duration: "03:49",
    cover: "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?w=300&h=300&fit=crop",
    url: "https://github.com/IF-Zh/Music/raw/refs/heads/main/%E6%97%A0%E7%95%8F%20Master%20%E2%85%A3.mp3"
  },
  {
    id: "03",
    title: "解限机",
    album: "流行摇滚",
    duration: "03:33",
    cover: "https://images.unsplash.com/photo-1485579149621-3123dd979885?w=300&h=300&fit=crop",
    url: "https://github.com/IF-Zh/Music/raw/refs/heads/main/%E8%A7%A3%E9%99%90%E6%9C%BA2.0.mp3"
  },
  {
    id: "04",
    title: "她",
    album: "音乐剧流行",
    duration: "04:47",
    cover: "https://images.unsplash.com/photo-1514525253440-b393452e8d26?w=300&h=300&fit=crop",
    url: "https://github.com/IF-Zh/Music/raw/refs/heads/main/%E5%A5%B9%20%E5%88%9D%E7%89%88.mp3"
  }, // <-- 在这里添加了逗号，以便添加更多歌曲
  {
    id: "05",
    title: "余温",
    album: "国风流行",
    duration: "04:04",
    cover: "https://images.unsplash.com/photo-1554160407-160538743126?w=300&h=300&fit=crop",
    url: "https://github.com/IF-Zh/Music/raw/refs/heads/main/%E4%BD%99%E6%B8%A9.mp3" 
  }
];

const EVENTS = [
  { id: "E01", date: "2023-12-15", venue: "LIVEHOUSE_SPACE", city: "SHANGHAI", status: "SOLD_OUT" },
  { id: "E02", date: "2023-12-22", venue: "THE_UNDERGROUND", city: "BEIJING", status: "ON_SALE" },
  { id: "E03", date: "2024-01-05", venue: "INDIE_FEST_V5", city: "GUANGZHOU", status: "PENDING" },
];

export default function MusicianProfile() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlayerVisible, setIsPlayerVisible] = useState(false);
  
  const audioRef = useRef(null);

  const formatTime = (time) => {
    if (!time) return "00:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handlePlayTrack = (index) => {
    setCurrentTrackIndex(index);
    setIsPlayerVisible(true);
    setIsPlaying(true);
  };

  const togglePlay = () => {
    if (!isPlayerVisible) {
      handlePlayTrack(0);
      return;
    }
    setIsPlaying(!isPlaying);
  };

  const playNext = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % TRACKS.length);
    setIsPlaying(true);
  };

  const playPrev = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + TRACKS.length) % TRACKS.length);
    setIsPlaying(true);
  };

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(e => console.log("Playback prevented", e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrackIndex]);

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };

  const handleEnded = () => {
    playNext();
  };

  const handleSeek = (e) => {
    const time = parseFloat(e.target.value);
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  };

  const currentTrack = TRACKS[currentTrackIndex];

  return (
    <div className="min-h-screen bg-[#050505] text-neutral-300 font-mono selection:bg-white selection:text-black pb-32">
      <audio
        ref={audioRef}
        src={currentTrack.url}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
      />

      {/* 顶部固定状态栏 */}
      <nav className="fixed top-0 w-full z-50 bg-[#050505] border-b border-neutral-800">
        <div className="flex justify-between items-center h-12 px-4 text-xs tracking-wider uppercase">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 ${isPlaying ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
            <span className="font-bold text-white">SYS.STATUS: {isPlaying ? 'ONLINE' : 'IDLE'}</span>
          </div>
          <div className="hidden md:flex gap-8">
            <a href="#music" className="hover:text-white hover:underline decoration-1 underline-offset-4">Index_01:Music</a>
            <a href="#about" className="hover:text-white hover:underline decoration-1 underline-offset-4">Index_02:Info</a>
            <a href="#tour" className="hover:text-white hover:underline decoration-1 underline-offset-4">Index_03:Dates</a>
          </div>
          <div className="text-neutral-500">V.2.0.24</div>
        </div>
      </nav>

      {/* Hero 区域 - 极简工业风 */}
      <header className="relative min-h-screen flex flex-col justify-between pt-20 pb-10 border-b border-neutral-800">
        {/* 背景网格装饰 */}
        <div className="absolute inset-0 pointer-events-none opacity-20" 
             style={{backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', backgroundSize: '40px 40px'}}>
        </div>

        <div className="container mx-auto px-4 z-10 flex-grow flex flex-col justify-center">
          <div className="border-l-2 border-white pl-6 md:pl-12 mb-8">
            <p className="text-sm md:text-base text-neutral-500 mb-2 tracking-[0.2em] uppercase">Audio / Visual / Data</p>
            <h1 className="text-6xl md:text-9xl font-bold text-white tracking-tighter uppercase leading-none mb-4 break-words">
              Lux<br/>Wave
            </h1>
          </div>
          
          <div className="pl-6 md:pl-12 max-w-xl">
            <p className="text-neutral-400 text-sm md:text-base leading-relaxed mb-8 border-t border-neutral-800 pt-4">
              // EXPERIMENTAL ELECTRONICS <br/>
              // SYNTHESIZING ANALOG DREAMS WITH DIGITAL REALITY. <br/>
              // DATA STREAM INITIATED.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => handlePlayTrack(0)}
                className="group relative px-8 py-3 bg-white text-black text-sm font-bold uppercase tracking-wider hover:bg-neutral-200 transition-colors"
              >
                <span className="flex items-center gap-2">
                  <Play size={16} fill="currentColor" /> Initiate_Playback
                </span>
                {/* 装饰性角标 */}
                <span className="absolute -bottom-1 -right-1 w-2 h-2 bg-black border border-white"></span>
              </button>
              
              <a href="#music" className="px-8 py-3 border border-neutral-700 text-white text-sm font-bold uppercase tracking-wider hover:bg-neutral-900 transition-colors text-center">
                View_Database
              </a>
            </div>
          </div>
        </div>

        {/* 底部滚动文字装饰 */}
        <div className="w-full overflow-hidden border-t border-b border-neutral-900 py-2 bg-black">
          <div className="whitespace-nowrap text-neutral-600 text-xs font-mono animate-pulse">
            SYSTEM_READY // AUDIO_ENGINE_LOADED // BUFFER_SIZE:512 // SAMPLE_RATE:48000 // SYSTEM_READY // AUDIO_ENGINE_LOADED //
          </div>
        </div>
      </header>

      {/* 音乐列表 - 数据表格样式 */}
      <section id="music" className="container mx-auto px-4 border-l border-r border-neutral-900 min-h-screen">
        <div className="py-20">
          <div className="flex items-end justify-between mb-12 border-b border-white pb-4">
            <h2 className="text-4xl md:text-5xl font-bold text-white uppercase">
              <span className="text-sm text-neutral-500 block mb-2 font-normal">// 01</span>
              Transmission
            </h2>
            <Activity className="text-neutral-600" />
          </div>
          
          <div className="grid grid-cols-1">
            {/* 表头 */}
            <div className="hidden md:grid grid-cols-12 gap-4 text-xs text-neutral-500 uppercase tracking-wider pb-4 border-b border-neutral-800 px-4">
              <div className="col-span-1">#</div>
              <div className="col-span-5">Track_Title</div>
              <div className="col-span-4">Album_Ref</div>
              <div className="col-span-2 text-right">Time</div>
            </div>

            {TRACKS.map((track, index) => (
              <div 
                key={track.id}
                onClick={() => handlePlayTrack(index)}
                className={`group grid grid-cols-1 md:grid-cols-12 gap-4 items-center py-4 px-4 border-b border-neutral-900 cursor-pointer transition-colors
                  ${currentTrackIndex === index ? 'bg-white text-black' : 'hover:bg-neutral-900 text-neutral-400 hover:text-white'}
                `}
              >
                <div className="col-span-1 font-bold text-xs">{track.id}</div>
                
                <div className="col-span-10 md:col-span-5 flex items-center gap-4">
                  {/* 只有在播放时或悬停时显示封面的小预览，默认隐藏保持极简 */}
                  <div className={`w-8 h-8 bg-neutral-800 overflow-hidden hidden md:block ${currentTrackIndex === index ? 'grayscale-0' : 'grayscale'}`}>
                    <img src={track.cover} alt="" className="w-full h-full object-cover" />
                  </div>
                  <span className="font-bold text-lg md:text-base truncate uppercase">{track.title}</span>
                  {currentTrackIndex === index && isPlaying && <div className="w-2 h-2 bg-black animate-pulse rounded-full ml-2"></div>}
                </div>
                
                <div className="hidden md:block col-span-4 text-xs uppercase opacity-70">{track.album}</div>
                <div className="hidden md:block col-span-2 text-right font-mono text-xs opacity-70">{track.duration}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 简介与图片 - 拼贴/档案风格 */}
      <section id="about" className="border-t border-neutral-800 bg-neutral-900/20">
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2">
          {/* 左侧文字区 */}
          <div className="p-8 md:p-20 border-r border-neutral-800">
            <span className="text-xs text-neutral-500 block mb-6">// 02 BIO_DATA</span>
            <h2 className="text-3xl font-bold text-white uppercase mb-8 leading-tight">
              Constructing <br/>Auditory <br/>Landscapes.
            </h2>
            <div className="space-y-6 text-sm md:text-base text-neutral-400 leading-relaxed font-mono">
              <p>
                <span className="text-white bg-neutral-800 px-1">LUX.WAVE</span> is an autonomous sound generation unit operating out of the digital void. Specializing in high-fidelity textures and rhythmic deconstruction.
              </p>
              <p>
                Influenced by brutalist architecture and early computing aesthetics, the project aims to strip back the superfluous, leaving only the raw signal and the noise.
              </p>
            </div>
            
            <div className="mt-12 flex flex-wrap gap-4">
              <a href="#" className="flex items-center gap-2 text-xs uppercase border border-neutral-700 px-4 py-2 hover:bg-white hover:text-black transition-colors">
                <Instagram size={14} /> IG_Link
              </a>
              <a href="#" className="flex items-center gap-2 text-xs uppercase border border-neutral-700 px-4 py-2 hover:bg-white hover:text-black transition-colors">
                <Twitter size={14} /> X_Feed
              </a>
            </div>
          </div>

          {/* 右侧图片区 - 去色处理 */}
          <div className="relative border-t lg:border-t-0 border-neutral-800 h-[50vh] lg:h-auto overflow-hidden group">
            <img 
              src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&q=80" 
              className="absolute inset-0 w-full h-full object-cover grayscale contrast-125 transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
              alt="Profile" 
            />
            {/* 装饰性覆盖层 */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjMDAwIiAvPgo8cmVjdCB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSIjMzMzIiAvPgo8L3N2Zz4=')] opacity-30"></div>
            <div className="absolute bottom-4 left-4 bg-black text-white px-2 py-1 text-xs">IMG_REF_0293.JPG</div>
          </div>
        </div>
      </section>

      {/* 巡演日程 - 终端列表风格 */}
      <section id="tour" className="py-20 container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-2xl font-bold uppercase text-white">// 03 Live_Executables</h2>
            <Globe className="text-neutral-600 animate-spin-slow" />
          </div>

          <div className="border border-neutral-800 bg-black">
             {/* 终端头部 */}
            <div className="bg-neutral-900 px-4 py-2 border-b border-neutral-800 flex gap-2">
              <div className="w-3 h-3 rounded-full bg-neutral-700"></div>
              <div className="w-3 h-3 rounded-full bg-neutral-700"></div>
              <div className="w-3 h-3 rounded-full bg-neutral-700"></div>
            </div>

            {EVENTS.map((event, idx) => (
              <div key={idx} className="flex flex-col md:flex-row md:items-center justify-between p-6 border-b border-neutral-900 last:border-0 hover:bg-neutral-900/30 transition-colors gap-4">
                <div className="flex items-start gap-4 md:w-1/3">
                  <span className="text-neutral-600 text-xs">[{event.id}]</span>
                  <div>
                    <div className="text-white font-bold">{event.date}</div>
                    <div className="text-xs text-neutral-500 uppercase mt-1">Date</div>
                  </div>
                </div>
                
                <div className="md:w-1/3">
                  <div className="text-white uppercase tracking-wider">{event.venue}</div>
                  <div className="text-xs text-neutral-500 mt-1">{event.city}</div>
                </div>

                <div className="md:w-1/3 flex justify-end">
                   {event.status === 'SOLD_OUT' ? (
                     <span className="text-neutral-600 text-xs uppercase border border-neutral-800 px-3 py-1 line-through">Sold_Out</span>
                   ) : (
                     <button className="text-xs uppercase bg-white text-black px-4 py-2 hover:bg-neutral-300 font-bold flex items-center gap-2">
                       Get_Ticket <ArrowUpRight size={14} />
                     </button>
                   )}
                </div>
              </div>
            ))}
            <div className="p-2 text-xs text-neutral-600 font-mono text-center bg-neutral-950">
              END OF LIST
            </div>
          </div>
        </div>
      </section>

      {/* 底部功能性页脚 */}
      <section id="contact" className="border-t border-neutral-800 py-20 bg-neutral-950">
        <div className="container mx-auto px-4 text-center">
          <Terminal size={32} className="mx-auto text-neutral-700 mb-6" />
          <h2 className="text-xl font-bold text-white uppercase mb-8">Initiate Contact Protocol</h2>
          <a href="mailto:booking@luxwave.music" className="text-2xl md:text-4xl text-neutral-400 hover:text-white transition-colors border-b-2 border-neutral-800 hover:border-white pb-2 font-light">
            booking@luxwave.music
          </a>
        </div>
      </section>

      {/* 页脚版权 */}
      <footer className="py-6 border-t border-neutral-900 text-center">
        <p className="text-[10px] text-neutral-600 uppercase tracking-widest">
          © 2024 LUX.WAVE // SYSTEM_ALL_RIGHTS_RESERVED
        </p>
      </footer>

      {/* 工业风悬浮播放器 */}
      {isPlayerVisible && (
        <div className="fixed bottom-0 left-0 right-0 bg-neutral-900 border-t border-white z-50 text-white font-mono">
          {/* 进度条作为顶部边框 */}
          <div className="relative w-full h-1 bg-neutral-800 cursor-pointer group" onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const percent = (e.clientX - rect.left) / rect.width;
            if (audioRef.current && isFinite(audioRef.current.duration)) {
                audioRef.current.currentTime = percent * audioRef.current.duration;
            }
          }}>
             <div 
               className="absolute top-0 left-0 h-full bg-white transition-all duration-100 ease-linear"
               style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
             ></div>
             {/* 悬停时的指示器 */}
             <div className="absolute top-0 h-full w-full opacity-0 group-hover:opacity-100 bg-white/20"></div>
          </div>

          <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-4">
            {/* 左侧：当前信息 */}
            <div className="flex items-center gap-4 w-1/3 overflow-hidden">
               <div className="hidden sm:flex items-center justify-center w-10 h-10 bg-black border border-neutral-700">
                  <Disc className={`w-5 h-5 text-neutral-400 ${isPlaying ? 'animate-spin' : ''}`} style={{animationDuration: '3s'}} />
               </div>
               <div className="flex flex-col min-w-0">
                 <span className="text-xs text-neutral-500 uppercase">Now_Playing</span>
                 <span className="text-sm font-bold truncate uppercase">{currentTrack.title}</span>
               </div>
            </div>

            {/* 中间：控制台 */}
            <div className="flex items-center gap-6 justify-center w-1/3">
              <button onClick={playPrev} className="hover:text-neutral-400 transition-colors"><SkipBack size={18} fill="currentColor" /></button>
              <button 
                onClick={togglePlay} 
                className="w-10 h-10 border border-white flex items-center justify-center hover:bg-white hover:text-black transition-colors"
              >
                {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" />}
              </button>
              <button onClick={playNext} className="hover:text-neutral-400 transition-colors"><SkipForward size={18} fill="currentColor" /></button>
            </div>

            {/* 右侧：时间数据 */}
            <div className="w-1/3 flex justify-end items-center gap-4 text-xs font-mono">
              <span className="hidden sm:inline text-neutral-500">TIMER:</span>
              <span>{formatTime(currentTime)} / {formatTime(duration)}</span>
              <button onClick={() => setIsPlayerVisible(false)} className="ml-4 hover:text-red-500"><X size={16} /></button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}