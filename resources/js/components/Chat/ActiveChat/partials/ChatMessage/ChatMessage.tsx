export const ChatMessage = ({ message, children }: { message: string; children?: React.ReactNode }) => (
  <div className="bg-background/80 sticky top-0 z-10 flex items-center justify-center gap-2 px-3 py-1 backdrop-blur" role="status" aria-live="polite">
    {children}
    <div className="text-muted-foreground py-2 text-center text-xs">{message}</div>
  </div>
)
