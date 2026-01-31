'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { team, TeamMember } from '@/data/team';
import { Linkedin, Twitter, Mail, X, MapPin, Lightbulb } from 'lucide-react';

function TeamMemberModal({
  member,
  onClose
}: {
  member: TeamMember;
  onClose: () => void;
}) {
  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/50 z-50"
      />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-2xl md:w-full bg-white rounded-2xl z-50 overflow-hidden max-h-[90vh] overflow-y-auto"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header with gradient */}
        <div className="bg-gradient-to-br from-primary-500 to-primary-700 h-32 relative">
          <div className="absolute -bottom-16 left-8">
            <div className="w-32 h-32 bg-white rounded-2xl shadow-lg flex items-center justify-center">
              <span className="text-5xl font-bold text-primary-600">
                {member.name.charAt(0)}
              </span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="pt-20 pb-8 px-8">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{member.name}</h2>
              <p className="text-primary-600 font-medium">{member.role}</p>
              <div className="flex items-center gap-2 text-gray-500 text-sm mt-2">
                <MapPin className="w-4 h-4" />
                {member.location}
              </div>
            </div>

            {/* Social links */}
            <div className="flex gap-2">
              {member.linkedin && (
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-primary-100 transition-colors"
                >
                  <Linkedin className="w-5 h-5 text-gray-600" />
                </a>
              )}
              {member.twitter && (
                <a
                  href={member.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-primary-100 transition-colors"
                >
                  <Twitter className="w-5 h-5 text-gray-600" />
                </a>
              )}
              {member.email && (
                <a
                  href={`mailto:${member.email}`}
                  className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-primary-100 transition-colors"
                >
                  <Mail className="w-5 h-5 text-gray-600" />
                </a>
              )}
            </div>
          </div>

          {/* Bio */}
          <div className="mt-6 space-y-4">
            {member.fullBio.split('\n\n').map((paragraph, index) => (
              <p key={index} className="text-gray-600 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Expertise */}
          <div className="mt-6">
            <h3 className="font-semibold text-gray-900 mb-3">Expertise</h3>
            <div className="flex flex-wrap gap-2">
              {member.expertise.map((skill) => (
                <span
                  key={skill}
                  className="bg-primary-50 text-primary-700 text-sm px-3 py-1 rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Fun fact */}
          {member.funFact && (
            <div className="mt-6 bg-amber-50 rounded-xl p-4 flex gap-3">
              <Lightbulb className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
              <div>
                <span className="text-amber-700 font-medium text-sm">Fun Fact</span>
                <p className="text-amber-900 text-sm mt-1">{member.funFact}</p>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </>
  );
}

export function TeamSection() {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Meet the Team
          </h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            The passionate people behind CareBow, working every day to help families care for their loved ones.
          </p>
        </motion.div>

        {/* Team Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {team.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelectedMember(member)}
              className="group cursor-pointer"
            >
              <div className="bg-gray-100 rounded-2xl overflow-hidden aspect-square relative">
                {/* Placeholder */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center">
                  <span className="text-6xl font-bold text-white/30">
                    {member.name.charAt(0)}
                  </span>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-primary-900/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-white font-medium">View Profile →</span>
                </div>
              </div>

              <div className="mt-4 text-center">
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                  {member.name}
                </h3>
                <p className="text-primary-600 text-sm font-medium">
                  {member.role}
                </p>
                <p className="text-gray-500 text-sm mt-2 line-clamp-2">
                  {member.shortBio}
                </p>
              </div>

              {/* Social links */}
              <div className="flex justify-center gap-3 mt-4">
                {member.linkedin && (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-primary-100 transition-colors"
                  >
                    <Linkedin className="w-4 h-4 text-gray-600" />
                  </a>
                )}
                {member.twitter && (
                  <a
                    href={member.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-primary-100 transition-colors"
                  >
                    <Twitter className="w-4 h-4 text-gray-600" />
                  </a>
                )}
                {member.email && (
                  <a
                    href={`mailto:${member.email}`}
                    onClick={(e) => e.stopPropagation()}
                    className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-primary-100 transition-colors"
                  >
                    <Mail className="w-4 h-4 text-gray-600" />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Modal */}
        <AnimatePresence>
          {selectedMember && (
            <TeamMemberModal
              member={selectedMember}
              onClose={() => setSelectedMember(null)}
            />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
