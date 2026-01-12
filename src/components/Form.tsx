"use client";

import { useState, useRef } from "react"
import { TeamType, TeamSchema } from "@/types/user";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createUser } from "@/actions/firebaseActions";

const teamFields = [
  {
    "id": 1,
    "field_name": "team_name",
    "type": "text",
    "label": "Team Designation",
    "placeholder": "e.g., Code Warriors, Byte Busters, Quantum Squad"
  },
  {
    "id": 2,
    "field_name": "team_email",
    "type": "email",
    "label": "Primary Contact Vector",
    "placeholder": "team.leader@email.com"
  },
  {
    "id": 3,
    "field_name": "team_phone_number",
    "type": "tel",
    "label": "Communication Channel",
    "placeholder": "+94 78 573 9876 (WhatsApp preferred)"
  },
];

const batchOptions = ["25.3", "25.2", "25.1", "24.3", "24.2", "24.1", "23.2", "23.1", "22.2"];
const degreeOptions = ["Artificial Intelligence", "Computer Science", "Data Science", "Computer Security", "Cyber Security", "Computer Networks", "Software Engineering", "Technology Management", "Management Information Systems"];

const Form = () => {
  const containerFormRef = useRef<HTMLFormElement>(null);

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitMessage, setSubmitMessage] = useState<{
    type: 'success' | 'error'
    | null, message: string
  }>({ type: null, message: '' });

  const { register, handleSubmit, formState: { errors }, reset, control } = useForm<TeamType>({
    resolver: zodResolver(TeamSchema),
    mode: "onChange",
    defaultValues: {
      team_name: "",
      team_email: "",
      team_phone_number: "",
      members: [
        { name: "", batch: undefined, degree: undefined },
        { name: "", batch: undefined, degree: undefined },
        { name: "", batch: undefined, degree: undefined },
      ]
    }
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: "members"
  });

  const onSubmit: SubmitHandler<TeamType> = async (data) => {
    setIsSubmitting(true);
    setSubmitMessage({ type: null, message: '' });

    try {
      console.log(data);
      const result = await createUser(data);
      if (result) {
        setSubmitMessage({ type: 'success', message: 'Access Granted. Journey Initiated.' });
      } else {
        setSubmitMessage({ type: 'error', message: 'Access Denied. Retry Protocol.' });
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'System Anomaly Detected.';
      setSubmitMessage({ type: 'error', message: errorMessage || 'System Anomaly Detected.' });
    } finally {
      setIsSubmitting(false);
      reset({
        team_name: "",
        team_email: "",
        team_phone_number: "",
        members: [
          { name: "", batch: undefined, degree: undefined },
          { name: "", batch: undefined, degree: undefined },
          { name: "", batch: undefined, degree: undefined },
        ]
      });
    }
  }

  return (
    <div className="w-full">
      <form
        onSubmit={handleSubmit(onSubmit)}
        ref={containerFormRef}
        className="relative glass-effect rounded-2xl p-8 md:p-12 exploration-shadow mysterious-border"
      >
        {/* Mysterious header */}
        <div className="text-center mb-12">
          <div className="inline-block relative">
            <h2 className="text-3xl md:text-4xl font-bold font-[var(--font-orbitron)] mystery-text-glow mb-2 tracking-wider">
              INITIATE PROTOCOL
            </h2>
            <div className="absolute -bottom-2 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent" />
          </div>
          <p className="mt-6 text-gray-400 font-[var(--font-space-mono)] tracking-widest text-sm">
            &gt;&gt; ENTER YOUR COORDINATES &lt;&lt;
          </p>
        </div>

        {/* Team Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {teamFields.map((field, idx) => (
            <div
              key={field.id}
              className="flex flex-col animate-fade-in-up"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <label className="mb-3 font-[var(--font-space-mono)] text-sm tracking-widest text-purple-300 uppercase">
                {field.label}
              </label>
              <input
                type={field.type}
                {...register(field.field_name as keyof TeamType)}
                className="bg-black/50 border border-purple-500/30 text-gray-100 px-4 py-3 rounded-lg 
                         focus:outline-none focus:border-purple-500 focus:mystery-glow
                         transition-all duration-300 font-[var(--font-space-mono)]
                         placeholder:text-gray-600"
                placeholder={field.placeholder || "..."}
              />
              <p className="text-red-400 text-xs mt-2 font-[var(--font-space-mono)]">
                {errors[field.field_name as keyof TeamType]?.message}
              </p>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="relative my-12">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-purple-500/20"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="bg-[#0a0a0f] px-6 text-purple-400 font-[var(--font-orbitron)] text-sm tracking-widest">
              CREW MANIFEST
            </span>
          </div>
        </div>

        {/* Team Members Section */}
        <div className="space-y-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-[var(--font-orbitron)] text-purple-300 tracking-wider">
              EXPLORERS [{fields.length}/4]
            </h3>
            {fields.length < 4 && (
              <button
                type="button"
                // @ts-expect-error - Zod resolver type compatibility issue with react-hook-form
                onClick={() => append({ name: "", batch: undefined, degree: undefined })}
                className="px-6 py-2 text-sm font-[var(--font-orbitron)] rounded-lg 
                         bg-gradient-to-r from-purple-600/20 to-cyan-600/20 
                         border border-purple-500/50 text-purple-300
                         hover:mystery-glow hover:border-purple-400
                         transition-all duration-300 tracking-wider uppercase"
              >
                + Recruit
              </button>
            )}
          </div>

          <div className="space-y-6">
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="p-6 rounded-xl mysterious-border glass-effect 
                         hover:exploration-shadow transition-all duration-300
                         animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex justify-between items-center mb-6">
                  <h4 className="text-lg font-[var(--font-orbitron)] text-cyan-400 tracking-wider">
                    EXPLORER #{index + 1}
                  </h4>
                  {fields.length > 3 && (
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="px-4 py-1 text-xs font-[var(--font-space-mono)] rounded-md 
                               bg-red-900/30 border border-red-500/50 text-red-400
                               hover:bg-red-900/50 hover:border-red-400
                               transition-all duration-300 tracking-wider uppercase"
                    >
                      Remove
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex flex-col">
                    <label className="mb-2 font-[var(--font-space-mono)] text-xs tracking-widest text-gray-400 uppercase">
                      Identity
                    </label>
                    <input
                      type="text"
                      {...register(`members.${index}.name`)}
                      className="bg-black/50 border border-purple-500/30 text-gray-100 px-3 py-2 rounded-md 
                               focus:outline-none focus:border-purple-500 focus:mystery-glow
                               transition-all duration-300 font-[var(--font-space-mono)] text-sm
                               placeholder:text-gray-600"
                      placeholder={`e.g. ${index === 0 ? "Yasasi" : (index === 1 ? "Nethmi" : (index == 2 ? "Amalmi" : "Achini"))}`}
                    />
                    <p className="text-red-400 text-xs mt-1 font-[var(--font-space-mono)]">
                      {errors.members?.[index]?.name?.message}
                    </p>
                  </div>

                  <div className="flex flex-col">
                    <label className="mb-2 font-[var(--font-space-mono)] text-xs tracking-widest text-gray-400 uppercase">
                      Cohort
                    </label>
                    <select
                      {...register(`members.${index}.batch`)}
                      className="bg-black/50 border border-purple-500/30 text-gray-100 px-3 py-2 rounded-md 
                               focus:outline-none focus:border-purple-500 focus:mystery-glow
                               transition-all duration-300 font-[var(--font-space-mono)] text-sm
                               appearance-none cursor-pointer"
                    >
                      <option value="" className="bg-[#0a0a0f]">Select...</option>
                      {batchOptions.map((option, idx) => (
                        <option key={idx} value={option} className="bg-[#0a0a0f]">{option}</option>
                      ))}
                    </select>
                    <p className="text-red-400 text-xs mt-1 font-[var(--font-space-mono)]">
                      {errors.members?.[index]?.batch?.message}
                    </p>
                  </div>

                  <div className="flex flex-col">
                    <label className="mb-2 font-[var(--font-space-mono)] text-xs tracking-widest text-gray-400 uppercase">
                      Specialization
                    </label>
                    <select
                      {...register(`members.${index}.degree`)}
                      className="bg-black/50 border border-purple-500/30 text-gray-100 px-3 py-2 rounded-md 
                               focus:outline-none focus:border-purple-500 focus:mystery-glow
                               transition-all duration-300 font-[var(--font-space-mono)] text-sm
                               appearance-none cursor-pointer"
                    >
                      <option value="" className="bg-[#0a0a0f]">Select...</option>
                      {degreeOptions.map((option, idx) => (
                        <option key={idx} value={option} className="bg-[#0a0a0f]">{option}</option>
                      ))}
                    </select>
                    <p className="text-red-400 text-xs mt-1 font-[var(--font-space-mono)]">
                      {errors.members?.[index]?.degree?.message}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {errors.members && typeof errors.members.message === 'string' && (
            <p className="text-red-400 text-sm mt-2 font-[var(--font-space-mono)]">{errors.members.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex justify-center mt-12">
          <button
            type="submit"
            disabled={isSubmitting}
            className="relative px-16 py-4 font-bold font-[var(--font-orbitron)] rounded-lg 
                     text-gray-100 tracking-widest text-lg uppercase
                     bg-gradient-to-r from-purple-600 via-purple-700 to-cyan-600 
                     hover:from-purple-500 hover:via-purple-600 hover:to-cyan-500
                     mystery-glow hover:animate-pulse-glow
                     transition-all duration-300 
                     disabled:opacity-50 disabled:cursor-not-allowed 
                     transform hover:scale-105 active:scale-95
                     overflow-hidden group"
          >
            <span className="relative z-10">
              {isSubmitting ? "PROCESSING..." : "BEGIN JOURNEY"}
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent 
                          translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
          </button>
        </div>

        {/* Status Message */}
        {submitMessage.type && (
          <div
            className={`mt-6 text-center p-4 rounded-lg font-[var(--font-space-mono)] tracking-wider
                       border animate-fade-in-up ${submitMessage.type === "success"
                ? "bg-green-900/20 border-green-500/50 text-green-400"
                : "bg-red-900/20 border-red-500/50 text-red-400"
              }`}
          >
            {submitMessage.message}
          </div>
        )}
      </form>
    </div>
  )
}

export default Form
