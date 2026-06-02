/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Heart, Share2, Eye, X, Newspaper, ChevronRight } from 'lucide-react';
import { blogList } from '../data';
import { BlogItem } from '../types';

export default function Blog() {
  const [selectedPost, setSelectedPost] = useState<BlogItem | null>(null);
  const [sharesCount, setSharesCount] = useState<Record<string, number>>({});

  const handleShare = (id: string, event: React.MouseEvent) => {
    event.stopPropagation();
    setSharesCount((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
    alert('Simulación: Enlace copiado al portapapeles. ¡Gracias por compartir salud!');
  };

  return (
    <section className="pt-8 pb-4 bg-white" id="seccion-blog">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* News section Title */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold text-emerald-700 tracking-widest uppercase font-mono bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100 inline-block">
            COMUNIDAD INFORMADA
          </span>
          <h3 className="font-sans font-black text-3xl sm:text-4xl text-emerald-950 tracking-tight leading-none">
            Actualidad en salud
          </h3>
          <div className="w-12 h-1 bg-emerald-500 mx-auto rounded"></div>
          <p className="text-xs sm:text-sm text-gray-500 leading-relaxed pt-1">
            Manténgase al día con las últimas novedades locales, consejos de medicina preventiva, calendarios epidemiológicos y reportes de salud comunitaria de Rioverde.
          </p>
        </div>

        {/* 4 horizontal-styled responsive grid cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" id="blog-posts-grid">
          {blogList.map((post) => (
            <div
              key={post.id}
              onClick={() => setSelectedPost(post)}
              className="bg-white border border-gray-100 rounded-2xl overflow-hidden hover:border-emerald-200 hover:shadow-lg transition-all duration-300 flex flex-col justify-between cursor-pointer group"
              id={`blog-card-${post.id}`}
            >
              <div>
                {/* Post image */}
                <div className="relative h-44 overflow-hidden bg-slate-100 shrink-0">
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  {/* Category overlay */}
                  <span className="absolute top-3 left-3 text-[9px] font-bold tracking-wider text-emerald-950 bg-white px-2.5 py-1 rounded-full uppercase shadow-sm">
                    {post.category}
                  </span>
                </div>

                {/* Post detail contents */}
                <div className="p-4 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-gray-400 font-mono text-[10px]">
                    <Calendar className="w-3 h-3" />
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h4 className="font-sans font-bold text-sm text-emerald-950 group-hover:text-emerald-700 transition-colors line-clamp-2 leading-snug">
                    {post.title}
                  </h4>
                  <p className="text-xs text-gray-500 line-clamp-3 leading-normal">
                    {post.description}
                  </p>
                </div>
              </div>

              {/* Action buttons footer */}
              <div className="p-4 pt-0 border-t border-gray-50 flex items-center justify-between mt-3 text-xs">
                <span className="text-emerald-700 font-bold flex items-center gap-0.5 group-hover:gap-1.5 transition-all text-[11px] uppercase tracking-wider">
                  Ver más noticias <ChevronRight className="w-3.5 h-3.5" />
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => handleShare(post.id, e)}
                    className="p-1 rounded bg-gray-50 text-gray-400 hover:text-emerald-750 hover:bg-emerald-50 transition-colors flex items-center gap-0.5 text-[10px]"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    {sharesCount[post.id] && <span>{sharesCount[post.id]}</span>}
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* DETAILED ARTICLE READER OVERLAY */}
      <AnimatePresence>
        {selectedPost && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[85vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header inside modal */}
              <div className="bg-emerald-950 text-white px-5 py-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Newspaper className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-bold uppercase tracking-wider font-mono">Lectura de Artículo - MSP</span>
                </div>
                <button
                  onClick={() => setSelectedPost(null)}
                  className="p-1 rounded-full hover:bg-white/10 text-emerald-200 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable contents */}
              <div className="p-6 overflow-y-auto space-y-5">
                <div className="relative h-60 w-full rounded-xl overflow-hidden bg-slate-100">
                  <img
                    src={selectedPost.imageUrl}
                    alt={selectedPost.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/40 to-transparent"></div>
                  <span className="absolute bottom-3 left-4 text-xs font-bold tracking-wider text-emerald-950 bg-white px-3 py-1 rounded-full uppercase">
                    {selectedPost.category}
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-400 font-mono text-xs">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Publicado el: {selectedPost.date}</span>
                    <span>•</span>
                    <span>Lectura: {selectedPost.readTime}</span>
                  </div>
                  <h3 className="font-sans font-extrabold text-xl sm:text-2xl text-emerald-950 tracking-tight leading-snug">
                    {selectedPost.title}
                  </h3>
                </div>

                {/* Article body content */}
                <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-line border-t border-gray-100 pt-5 font-sans">
                  {selectedPost.content}
                </div>
              </div>

              {/* Reader footer actions */}
              <div className="bg-slate-50 px-6 py-4 flex items-center justify-between border-t border-gray-100">
                <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
                  <Heart className="w-4 h-4 text-emerald-600 inline shrink-0 fill-emerald-100" />
                  <span>Publicación de Prevención y Educación Médica</span>
                </div>
                <button
                  onClick={(e) => handleShare(selectedPost.id, e)}
                  className="px-4 py-2 bg-emerald-800 hover:bg-emerald-950 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5" /> Compartir Noticia
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
