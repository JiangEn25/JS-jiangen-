import React, { useState, useEffect } from 'react';
import {
  Typography,
  Container,
  Box,
  useTheme,
  Button,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';
import { Link } from 'react-router-dom';

// 导入本地图片（假设图片放在 src/assets/ 目录下）
import background1 from './assets/background1.jpg';
import background2 from './assets/background2.jpg';
import background3 from './assets/background3.jpg';

const HomePage: React.FC = () => {
  const theme = useTheme();
  const [currentBackground, setCurrentBackground] = useState(0);
  const [nextBackground, setNextBackground] = useState(1);
  const [fade, setFade] = useState(false); // 控制淡入淡出效果
  const [open, setOpen] = useState(false); // 控制对话框的打开和关闭
  const [formData, setFormData] = useState({
    username: '',
    contact: '',
    description: '',
  });

  // 背景图片列表
  const backgrounds = [background1, background2, background3];

  // 图片轮换逻辑
  useEffect(() => {
    const interval = setInterval(() => {
      // 触发淡出效果
      setFade(true);

      // 在淡出动画完成后切换图片
      setTimeout(() => {
        setCurrentBackground(nextBackground);
        setNextBackground((nextBackground + 1) % backgrounds.length);
        setFade(false); // 重置淡入淡出状态
      }, 1000); // 过渡时间为 1 秒
    }, 5000); // 每 5 秒切换一次图片

    return () => clearInterval(interval); // 清除定时器
  }, [nextBackground, backgrounds.length]);

  // 打开对话框
  const handleClickOpen = () => {
    setOpen(true);
  };

  // 关闭对话框
  const handleClose = () => {
    setOpen(false);
  };

  // 处理表单输入
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // 处理表单提交
  const handleSubmit = () => {
    console.log('Form Data:', formData); // 打印表单数据（可以替换为实际的提交逻辑）
    handleClose(); // 关闭对话框
  };

  return (
    <Box
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden', // 防止内容溢出
      }}
    >
      {/* 当前背景图片 */}
      <Box
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url(${backgrounds[currentBackground]})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: fade ? 0 : 1, // 控制淡出效果
          transition: 'opacity 1s ease-in-out', // 过渡效果
          zIndex: 1,
        }}
      />

      {/* 下一张背景图片 */}
      <Box
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url(${backgrounds[nextBackground]})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: fade ? 1 : 0, // 控制淡入效果
          transition: 'opacity 1s ease-in-out', // 过渡效果
          zIndex: 2,
        }}
      />

      {/* 背景虚化遮罩层 */}
      <Box
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.4)', // 半透明黑色遮罩
          backdropFilter: 'blur(1px)', // 虚化效果
          zIndex: 3,
        }}
      />

      {/* 内容区域 */}
      <Container maxWidth="lg" style={{ position: 'relative', zIndex: 4 }}>
        <Box
          textAlign="center"
          style={{
            padding: theme.spacing(4),
            borderRadius: theme.shape.borderRadius,
          }}
        >
          <Typography
            variant="h3"
            gutterBottom
            style={{ color: theme.palette.primary.main, fontWeight: 'bold' }}
          >
            Welcome to India's Rainfall Data Presentation (1901 - 2015)
          </Typography>
          <Typography
            variant="h6"
            paragraph
            style={{ color: theme.palette.text.secondary }}
          >
            Explore detailed rainfall data for India from 1901 to 2015. Navigate through various charts and statistics to gain insights into rainfall patterns and trends.
          </Typography>
          <Grid container spacing={3} justifyContent="center" style={{ marginTop: theme.spacing(4) }}>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/MyFirstPage"
                size="large"
              >
                Explore Charts
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleClickOpen} // 点击按钮打开对话框
                size="large"
              >
                Contact Us
              </Button>
            </Grid>
          </Grid>
          <Typography
            variant="body1"
            paragraph
            style={{ marginTop: theme.spacing(4), color: theme.palette.text.secondary }}
          >
            Our intuitive data visualization tools help you 
            easily understand complex datasets and uncover valuable insights.
          </Typography>
          <Typography
            variant="body1"
            paragraph
            style={{ color: theme.palette.text.secondary }}
          >
            --------------------------------------------------------------------------------------------------------------------------
          </Typography>
          <Typography
            variant="body1"
            paragraph
            style={{ color: theme.palette.text.secondary }}
          >
            For any inquiries or assistance, free to contact us at *****@**.com  or click the CONTACT US button.
          </Typography>
        </Box>
      </Container>

      {/* 对话框 */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Contact Us</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              fullWidth
              label="Username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
            />
            <TextField
              margin="normal"
              fullWidth
              label="Contact Information"
              name="contact"
              value={formData.contact}
              onChange={handleInputChange}
            />
            <TextField
              margin="normal"
              fullWidth
              label="Problem Description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              multiline
              rows={4}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default HomePage;