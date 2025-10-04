"use client";

import { useState } from 'react';
import { Download, Instagram, Music, Facebook, Check, X, Heart, Star, Gift } from 'lucide-react';

type SocialPlatform = 'instagram' | 'tiktok' | 'facebook';

interface DownloadProgress {
  isDownloading: boolean;
  progress: number;
  status: string;
}

export default function SemMarcasDagua() {
  const [activeTab, setActiveTab] = useState<SocialPlatform>('instagram');
  const [videoUrl, setVideoUrl] = useState('');
  const [downloadProgress, setDownloadProgress] = useState<DownloadProgress>({
    isDownloading: false,
    progress: 0,
    status: ''
  });
  const [showSupportModal, setShowSupportModal] = useState(false);
  const [downloadedVideos, setDownloadedVideos] = useState(0);

  const platforms = {
    instagram: {
      name: 'Instagram',
      icon: Instagram,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-gradient-to-r from-purple-500 to-pink-500',
      placeholder: 'Cole o link do Instagram aqui...',
      pattern: /instagram\.com\/(p|reel|tv)\/[a-zA-Z0-9_-]+/
    },
    tiktok: {
      name: 'TikTok',
      icon: Music,
      color: 'from-black to-red-500',
      bgColor: 'bg-gradient-to-r from-black to-red-500',
      placeholder: 'Cole o link do TikTok aqui...',
      pattern: /tiktok\.com\/@[a-zA-Z0-9._-]+\/video\/[0-9]+/
    },
    facebook: {
      name: 'Facebook',
      icon: Facebook,
      color: 'from-blue-600 to-blue-700',
      bgColor: 'bg-gradient-to-r from-blue-600 to-blue-700',
      placeholder: 'Cole o link do Facebook aqui...',
      pattern: /facebook\.com\/[a-zA-Z0-9._-]+\/videos\/[0-9]+/
    }
  };

  const validateUrl = (url: string): boolean => {
    const platform = platforms[activeTab];
    return platform.pattern.test(url) || url.includes(platform.name.toLowerCase());
  };

  const simulateDownload = async () => {
    if (!videoUrl.trim()) {
      alert('Por favor, insira um link válido!');
      return;
    }

    if (!validateUrl(videoUrl)) {
      alert(`Link inválido para ${platforms[activeTab].name}. Verifique o formato do link.`);
      return;
    }

    setDownloadProgress({
      isDownloading: true,
      progress: 0,
      status: 'Analisando link...'
    });

    // Simulação de progresso de download
    const steps = [
      { progress: 20, status: 'Validando URL...' },
      { progress: 40, status: 'Removendo marca d\'água...' },
      { progress: 60, status: 'Processando vídeo...' },
      { progress: 80, status: 'Preparando download...' },
      { progress: 100, status: 'Download concluído!' }
    ];

    for (const step of steps) {
      await new Promise(resolve => setTimeout(resolve, 800));
      setDownloadProgress(prev => ({
        ...prev,
        progress: step.progress,
        status: step.status
      }));
    }

    // Finalizar download
    setTimeout(() => {
      setDownloadProgress({
        isDownloading: false,
        progress: 0,
        status: ''
      });
      setDownloadedVideos(prev => prev + 1);
      setVideoUrl('');
      setShowSupportModal(true);
    }, 1000);
  };

  const SupportModal = () => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl p-6 max-w-sm w-full mx-4 shadow-2xl">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            Vídeo Baixado!
          </h3>
          
          <p className="text-gray-600 mb-6">
            Seu vídeo foi salvo sem marca d'água na pasta Downloads/SemMarcasDagua
          </p>

          <div className="space-y-3 mb-6">
            <button className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-2 hover:shadow-lg transition-all">
              <Gift className="w-5 h-5" />
              Remover Anúncios - R$ 4,99
            </button>
            
            <button className="w-full bg-gradient-to-r from-pink-500 to-red-500 text-white font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-2 hover:shadow-lg transition-all">
              <Heart className="w-5 h-5" />
              Apoiar Desenvolvedor
            </button>
          </div>

          <button 
            onClick={() => setShowSupportModal(false)}
            className="w-full bg-gray-100 text-gray-700 font-medium py-2 px-4 rounded-xl hover:bg-gray-200 transition-colors"
          >
            Continuar Grátis
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F2F2F7]">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-md mx-auto px-4 py-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Sem Marcas d'Água
            </h1>
            <p className="text-gray-600 text-sm">
              Baixe vídeos sem marca d'água
            </p>
            <div className="mt-3 text-xs text-gray-500">
              {downloadedVideos} vídeos baixados
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-md mx-auto px-4 py-4">
        <div className="flex bg-white rounded-2xl p-1 shadow-sm">
          {Object.entries(platforms).map(([key, platform]) => {
            const Icon = platform.icon;
            const isActive = activeTab === key;
            
            return (
              <button
                key={key}
                onClick={() => setActiveTab(key as SocialPlatform)}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium transition-all ${
                  isActive 
                    ? `${platform.bgColor} text-white shadow-lg` 
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-sm">{platform.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-md mx-auto px-4 pb-8">
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Link do vídeo
            </label>
            <div className="relative">
              <input
                type="url"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                placeholder={platforms[activeTab].placeholder}
                className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
                disabled={downloadProgress.isDownloading}
              />
              {videoUrl && (
                <button
                  onClick={() => setVideoUrl('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>

          {/* Progress Bar */}
          {downloadProgress.isDownloading && (
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">
                  {downloadProgress.status}
                </span>
                <span className="text-sm text-gray-500">
                  {downloadProgress.progress}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${platforms[activeTab].bgColor}`}
                  style={{ width: `${downloadProgress.progress}%` }}
                />
              </div>
            </div>
          )}

          {/* Download Button */}
          <button
            onClick={simulateDownload}
            disabled={downloadProgress.isDownloading || !videoUrl.trim()}
            className={`w-full py-4 px-6 rounded-xl font-semibold text-white flex items-center justify-center gap-3 transition-all ${
              downloadProgress.isDownloading || !videoUrl.trim()
                ? 'bg-gray-300 cursor-not-allowed'
                : `${platforms[activeTab].bgColor} hover:shadow-lg hover:scale-105`
            }`}
          >
            <Download className="w-5 h-5" />
            {downloadProgress.isDownloading ? 'Baixando...' : 'Baixar Vídeo'}
          </button>

          {/* Info */}
          <div className="mt-6 p-4 bg-blue-50 rounded-xl">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <Check className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <h4 className="font-medium text-blue-900 mb-1">
                  100% Sem Marca d'Água
                </h4>
                <p className="text-sm text-blue-700">
                  Todos os vídeos são baixados em alta qualidade, sem marcas d'água ou logos.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="bg-white rounded-xl p-4 shadow-sm text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Download className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 text-sm mb-1">
              Download Rápido
            </h3>
            <p className="text-xs text-gray-600">
              Baixe em segundos
            </p>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Star className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900 text-sm mb-1">
              Alta Qualidade
            </h3>
            <p className="text-xs text-gray-600">
              Resolução original
            </p>
          </div>
        </div>

        {/* Ad Space */}
        <div className="mt-6 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-xl p-4 border border-yellow-200">
          <div className="text-center">
            <p className="text-sm font-medium text-orange-800 mb-2">
              📱 Área de Anúncios
            </p>
            <p className="text-xs text-orange-700">
              Remova os anúncios por apenas R$ 4,99
            </p>
          </div>
        </div>
      </div>

      {/* Support Modal */}
      {showSupportModal && <SupportModal />}
    </div>
  );
}