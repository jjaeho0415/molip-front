// src/components/AuthRedirectWrapper.tsx
'use client'; // 클라이언트 컴포넌트로 마크

import React, { ReactNode } from 'react';
import useAuthRedirect from '@/hooks/useAuthRedirect';

interface AuthRedirectWrapperProps {
	children: ReactNode;
}

const AuthRedirectWrapper: React.FC<AuthRedirectWrapperProps> = ({
	children,
}) => {
	useAuthRedirect();

	return <>{children}</>;
};

export default AuthRedirectWrapper;
