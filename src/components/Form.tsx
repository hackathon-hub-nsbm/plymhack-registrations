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
    "label": "Team Name"
  },
  {
    "id": 2,
    "field_name": "team_email",
    "type": "email",
    "label": "Team Email Address"
  },
  {
    "id": 3,
    "field_name": "team_phone_number",
    "type": "tel",
    "label": "Team Phone Number"
  },
];

const batchOptions = ["25.3", "25.2", "25.1", "24.3", "24.2", "24.1", "23.2", "23.1"];
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
      isMember: undefined,
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
        setSubmitMessage({ type: 'success', message: 'Registration successful!' });
      } else {
        setSubmitMessage({ type: 'error', message: 'Registration failed!' });
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred during registration.';
      setSubmitMessage({ type: 'error', message: errorMessage || 'An error occurred during registration.' });
    } finally {
      setIsSubmitting(false);
      reset({
        team_name: "",
        team_email: "",
        team_phone_number: "",
        isMember: undefined,
        members: [
          { name: "", batch: undefined, degree: undefined },
          { name: "", batch: undefined, degree: undefined },
          { name: "", batch: undefined, degree: undefined },
        ]
      });
    }
  }

  return (
    <div className="flex justify-center items-center text-white w-full h-full">
      <form
        onSubmit={handleSubmit(onSubmit)}
        ref={containerFormRef}
        className="relative p-6 w-full rounded-2xl shadow-[0_0_30px_rgba(128,0,255,0.4)] border border-purple-500/50 bg-black/40 backdrop-blur-xl md:max-h-[calc(100vh-3rem)] md:overflow-y-auto"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Team Registration</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
          {teamFields.map(field => (
            <div key={field.id} className="flex flex-col">
              <label className="mb-2 font-semibold tracking-wide text-cyan-300">{field.label}</label>
              <input
                type={field.type}
                {...register(field.field_name as keyof TeamType)}
                className="bg-black/30 border border-purple-500 text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
              <p className="text-red-400 text-sm mt-1">{errors[field.field_name as keyof TeamType]?.message}</p>
            </div>
          ))}
        </div>

        <div className="mb-6 text-center">
          <label className="block mb-3 font-semibold text-cyan-300">Are you already a member?</label>
          <div className="flex justify-center gap-8">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                value="true"
                {...register("isMember", { setValueAs: v => v === "true" })}
                className="accent-purple-500"
              />
              <span className="hover:text-cyan-400">Yes</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                value="false"
                {...register("isMember", { setValueAs: v => v === "true" })}
                className="accent-purple-500"
              />
              <span className="hover:text-cyan-400">No</span>
            </label>
          </div>
          <p className="text-red-400 text-sm mt-1">{errors.isMember?.message}</p>
        </div>

        <div className="border-t border-purple-500 pt-4">
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">Team Members ({fields.length}/4)</h2>
            {fields.length < 4 && (
              <button
                type="button"
                // @ts-expect-error - Zod resolver type compatibility issue with react-hook-form
                onClick={() => append({ name: "", batch: undefined, degree: undefined })}
                className="px-4 py-2 text-sm font-semibold rounded-lg text-white bg-gradient-to-r from-green-600 to-teal-600 hover:from-teal-600 hover:to-green-600 transition-all duration-300 shadow-lg"
              >
                + Add Member
              </button>
            )}
          </div>

          <div className="space-y-4">
            {fields.map((field, index) => (
              <div key={field.id} className="p-4 rounded-lg border border-purple-500/50 bg-gradient-to-br from-purple-900/20 to-black/30 hover:border-purple-400/50 transition-all">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-cyan-300">Member {index + 1}</h3>
                  {fields.length > 3 && (
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="px-3 py-1 text-sm font-semibold rounded-md text-white bg-red-600/80 hover:bg-red-600 transition-all duration-300"
                    >
                      Remove
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="flex flex-col">
                    <label className="mb-2 font-semibold tracking-wide text-cyan-300">Name</label>
                    <input
                      type="text"
                      {...register(`members.${index}.name`)}
                      className="bg-black/30 border border-purple-500 text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    />
                    <p className="text-red-400 text-sm mt-1">{errors.members?.[index]?.name?.message}</p>
                  </div>

                  <div className="flex flex-col">
                    <label className="mb-2 font-semibold tracking-wide text-cyan-300">Batch</label>
                    <select
                      {...register(`members.${index}.batch`)}
                      className="bg-black/30 border border-purple-500 text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    >
                      <option value="">Select Batch</option>
                      {batchOptions.map((option, idx) => (
                        <option key={idx} value={option}>{option}</option>
                      ))}
                    </select>
                    <p className="text-red-400 text-sm mt-1">{errors.members?.[index]?.batch?.message}</p>
                  </div>

                  <div className="flex flex-col">
                    <label className="mb-2 font-semibold tracking-wide text-cyan-300">Degree</label>
                    <select
                      {...register(`members.${index}.degree`)}
                      className="bg-black/30 border border-purple-500 text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    >
                      <option value="">Select Degree</option>
                      {degreeOptions.map((option, idx) => (
                        <option key={idx} value={option}>{option}</option>
                      ))}
                    </select>
                    <p className="text-red-400 text-sm mt-1">{errors.members?.[index]?.degree?.message}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {errors.members && typeof errors.members.message === 'string' && (
            <p className="text-red-400 text-sm mt-2">{errors.members.message}</p>
          )}
        </div>

        <div className="flex justify-center mt-8">
          <button
            type="submit"
            disabled={isSubmitting}
            className="relative px-12 py-3 font-bold rounded-lg text-white bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 hover:shadow-[0_0_25px_rgba(0,255,255,0.6)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
          >
            {isSubmitting ? "Submitting..." : "Register Team"}
          </button>
        </div>

        {submitMessage.type && (
          <div
            className={`mt-4 text-center p-3 rounded-md ${submitMessage.type === "success" ? "bg-green-600/40" : "bg-red-600/40"
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
