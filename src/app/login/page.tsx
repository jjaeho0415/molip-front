'use client';

export default function Login() {
  const loginHandler = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API}/oauth2/authorization/kakao`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(
        'There has been a problem with your fetch operation:',
        error,
      );
    }
  };

  return (
    <div>
      <button onClick={loginHandler}>로그인</button>
    </div>
  );
}
