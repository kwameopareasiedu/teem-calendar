import Location from "../models/location.ts";
import React from "react";
import { useForm } from "react-hook-form";
import Booking, { prefixTime, timeRange } from "../models/booking.ts";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import * as dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";

dayjs.extend(isSameOrBefore);

interface BookFormProps {
  onBook: (data: Booking) => void;
  onClose: () => void;
}

interface FormValues {
  location: string;
  from: string;
  to: string;
}

export default function BookForm({ onBook, onClose }: BookFormProps) {
  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm<FormValues>({
    values: {
      location: "",
      from: "",
      to: ""
    },
    resolver: yupResolver(
      Yup.object({
        location: Yup.string().required("Required"),
        from: Yup.string()
          .required("Required")
          .test(
            "from-before-to",
            "'From' must be before 'To'",
            (val, { parent }) => {
              if (parent.to) {
                const from = dayjs(`2023-01-01 ${val}`);
                const to = dayjs(`2023-01-01 ${parent.to}`);
                if (to.isSameOrBefore(from)) return false;
              }

              return true;
            }
          ),
        to: Yup.string()
          .required("Required")
          .test(
            "to-after-from",
            "'To' must be after 'From'",
            (val, { parent }) => {
              if (parent.from) {
                const from = dayjs(`2023-01-01 ${parent.from}`);
                const to = dayjs(`2023-01-01 ${val}`);
                if (to.isSameOrBefore(from)) return false;
              }

              return true;
            }
          )
      })
    )
  });

  const confirmBooking = (data: FormValues) => {
    onBook(
      new Booking(
        parseInt(data.location),
        dayjs(prefixTime(data.from)),
        dayjs(prefixTime(data.to))
      )
    );
  };

  return (
    <div className="p-8 bg-white rounded-md">
      <div className="flex items-center mb-8">
        <h1 className="flex-1 text-3xl">New Booking</h1>
        <button
          className="px-2 h-8 rounded text-xs tracking-widest text-gray-400"
          onClick={onClose}>
          DISMISS (X)
        </button>
      </div>

      <form onSubmit={handleSubmit(confirmBooking)}>
        <div className="mb-4">
          <label className="text-sm font-italic block mb-2">
            Booking Location
          </label>

          <select
            className="w-full px-6 py-3 rounded border-2 border-transparent hover:border-slate-300 focus:outline-none focus:border-slate-300"
            {...register("location", { required: true })}>
            <option value="">Choose a location</option>
            <option value={Location.first}>Location 1</option>
            <option value={Location.second}>Location 2</option>
            <option value={Location.third}>Location 3</option>
          </select>

          {errors.location && (
            <p className="mt-1 text-xs text-red-400">
              {errors.location.message}
            </p>
          )}
        </div>

        <div className="mb-6 grid grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-italic block mb-2">From</label>

            <select
              className="w-full px-6 py-3 rounded border-2 border-transparent hover:border-slate-300 focus:outline-none focus:border-slate-300"
              {...register("from", { required: true })}>
              <option value="">Choose a time</option>
              {timeRange.map(d => (
                <option key={d.format("HH:mm")} value={d.format("HH:mm")}>
                  {d.format("hh:mm A")}
                </option>
              ))}
            </select>

            {errors.from && (
              <p className="mt-1 text-xs text-red-400">{errors.from.message}</p>
            )}
          </div>

          <div>
            <label className="text-sm font-italic block mb-2">To</label>
            <select
              className="w-full px-6 py-3 rounded border-2 border-transparent hover:border-slate-300 focus:outline-none focus:border-slate-300"
              {...register("to", { required: true })}>
              <option value="">Choose a time</option>
              {timeRange.map(d => (
                <option key={d.format("HH:mm")} value={d.format("HH:mm")}>
                  {d.format("hh:mm A")}
                </option>
              ))}
            </select>

            {errors.to && (
              <p className="mt-1 text-xs text-red-400">{errors.to.message}</p>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-4 rounded bg-cyan-600 font-bold text-white disabled:bg-gray-200 disabled:cursor-not-allowed">
          Confirm Booking
        </button>
      </form>
    </div>
  );
}
