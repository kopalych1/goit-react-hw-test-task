'use client';

import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { createBookingRequest } from '@/lib/api/cars';
import css from './BookingForm.module.css';

interface BookingFormProps {
  carId: string;
}

interface FormValues {
  name: string;
  email: string;
  comment: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  comment?: string;
}

const initialValues: FormValues = { name: '', email: '', comment: '' };

export default function BookingForm({ carId }: BookingFormProps) {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});

  const mutation = useMutation({
    mutationFn: (data: FormValues) => createBookingRequest(carId, data),
    onSuccess: response => {
      toast.success(response.message);
      setValues(initialValues);
      setErrors({});
    },
    onError: () => {
      toast.error('Something went wrong. Please try again.');
    },
  });

  function validate(): boolean {
    const newErrors: FormErrors = {};

    if (!values.name.trim()) {
      newErrors.name = 'Please enter your name.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(values.email)) {
      newErrors.email = 'Please enter your email.';
    }

    if (!values.comment.trim()) {
      newErrors.comment = 'Comment is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setValues({ ...values, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (validate()) {
      mutation.mutate(values);
    }
  }

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <h3 className={css.title}>Book your car now</h3>
      <p className={css.subtitle}>Stay connected! We are always ready to help you.</p>

      <div className={css.field}>
        <input
          type="text"
          name="name"
          placeholder="Name*"
          value={values.name}
          onChange={handleChange}
          className={`${css.input} ${errors.name ? css.inputError : ''}`}
        />
        {errors.name && <p className={css.errorText}>{errors.name}</p>}
      </div>

      <div className={css.field}>
        <input
          type="email"
          name="email"
          placeholder="Email*"
          value={values.email}
          onChange={handleChange}
          className={`${css.input} ${errors.email ? css.inputError : ''}`}
        />
        {errors.email && <p className={css.errorText}>{errors.email}</p>}
      </div>

      <div className={css.field}>
        <textarea
          name="comment"
          placeholder="Comment"
          value={values.comment}
          onChange={handleChange}
          rows={4}
          className={`${css.textarea} ${errors.comment ? css.inputError : ''}`}
        />
        {errors.comment && <p className={css.errorText}>{errors.comment}</p>}
      </div>

      <button type="submit" className={css.submitButton} disabled={mutation.isPending}>
        {mutation.isPending ? 'Sending...' : 'Send'}
      </button>
    </form>
  );
}
