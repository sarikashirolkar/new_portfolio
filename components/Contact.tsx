"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { personal } from "@/lib/data";

export function Contact() {
  return (
    <section id="contact" className="py-32 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          <div
            className="text-xs uppercase tracking-[0.3em] mb-4"
            style={{ color: "var(--accent)" }}
          >
            07 / Let&apos;s build
          </div>
          <h2 className="font-display text-5xl md:text-7xl font-bold tracking-tight">
            <span className="aurora-text">Thank you.</span>
          </h2>
          <p className="mt-6 text-lg max-w-2xl mx-auto" style={{ color: "var(--fg-soft)" }}>
            I&apos;m looking to own and build AI-native products from zero to scale. If that
            sounds like your team, let&apos;s talk.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-3"
        >
          <a href={`mailto:${personal.email}`} className="btn-primary">
            <Mail className="w-4 h-4" />
            {personal.email}
          </a>
          <a href={personal.linkedin} target="_blank" rel="noreferrer" className="btn-ghost">
            <Linkedin className="w-4 h-4" />
            LinkedIn
          </a>
          <a href={personal.github} target="_blank" rel="noreferrer" className="btn-ghost">
            <Github className="w-4 h-4" />
            GitHub
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-16 flex flex-wrap items-center justify-center gap-6 text-sm"
          style={{ color: "var(--fg-soft)" }}
        >
          <span className="inline-flex items-center gap-2"><MapPin className="w-4 h-4" />{personal.location}</span>
          <span className="inline-flex items-center gap-2"><Phone className="w-4 h-4" />{personal.phone}</span>
        </motion.div>

        <div className="mt-24 pt-8 section-divider" />
        <div className="mt-8 text-xs font-mono" style={{ color: "var(--fg-soft)" }}>
          © {new Date().getFullYear()} Sarika Shirolkar · Built with Next.js, Three.js & a lot of aurora.
        </div>
      </div>
    </section>
  );
}
