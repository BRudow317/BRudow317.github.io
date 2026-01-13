
function PasswordInput({ value, onChange, id = 'password', name = 'password' }) {
  return (
    <input
      id={id}
      name={name}
      type="password"
      value={value}
      onChange={onChange}
      autoComplete="current-password"
    />
  );
}

export { PasswordInput } ;
