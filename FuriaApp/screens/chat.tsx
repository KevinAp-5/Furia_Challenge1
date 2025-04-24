import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native'; // Suporte para temas

type Message = {
  id: string;
  user: string;
  text: string;
};

export default function ChatScreen() {
  const { colors } = useTheme(); // Obtendo cores do tema
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>('');
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    // Conectando ao WebSocket
    const ws = new WebSocket('ws://your-websocket-server-url');
    setSocket(ws);

    ws.onmessage = (event) => {
      const newMessage: Message = JSON.parse(event.data);
      setMessages((prev) => [...prev, newMessage]);
    };

    ws.onclose = () => {
      console.log('WebSocket desconectado');
    };

    return () => {
      ws.close();
    };
  }, []);

  const sendMessage = () => {
    if (socket && input.trim()) {
      const message: Message = {
        id: Date.now().toString(),
        user: 'Você',
        text: input,
      };
      socket.send(JSON.stringify(message));
      setMessages((prev) => [...prev, message]);
      setInput('');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.messageBox}>
            <Text style={[styles.user, { color: colors.primary }]}>{item.user}:</Text>
            <Text style={[styles.text, { color: colors.text }]}>{item.text}</Text>
          </View>
        )}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, { backgroundColor: colors.card, color: colors.text }]}
          placeholder="Digite sua mensagem..."
          placeholderTextColor={colors.border}
          value={input}
          onChangeText={setInput}
        />
        <Button title="Enviar" onPress={sendMessage} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  messageBox: { marginBottom: 12, padding: 8, borderRadius: 8, borderWidth: 1 },
  user: { fontWeight: 'bold', marginBottom: 4 },
  text: { fontSize: 16 },
  inputContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  input: { flex: 1, padding: 8, borderRadius: 8, marginRight: 8, borderWidth: 1 },
});
