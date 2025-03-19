import { FormFieldProps } from "../types";

const FormField: React.FC<FormFieldProps> = ({
  type,
  placeholder,
  className ,
  name,
  register,
  error,
  valueAsNumber,
}) => (
  <>
    <input
     className={className}
      type={type}
      placeholder={placeholder}
      {...register(name, { valueAsNumber })}
    />
    {error && <span className="error-message">{error.message}</span>}
  </>
);
export default FormField;
